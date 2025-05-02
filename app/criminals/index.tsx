import Box from "@/components/Box";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useAppTheme } from "@/hooks/useAppTheme";
import { supabase } from "@/utils/supabase";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { primary100, primary200, primary300, bg200 } = useAppTheme();
  const [criminals, setCriminals] = useState<ICriminal[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("criminals").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setCriminals(data);
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(() => {
    fetchData();
  });

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 200 }}>
        <Text variant="h2" center mv={16}>
          Criminal List
        </Text>
        <Input
          placeholder="ex: 72.0008"
          keyboardType="number-pad"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />

        {criminals
          .filter((item) => item.full_name.toLowerCase().includes(search.toLowerCase()))
          .map(({ full_name, id, avatar_url, address, lat, lon }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.push(`/criminals/${id}`);
                }}
                key={id}
                style={{
                  marginVertical: 8,
                  gap: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: bg200,
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <Image
                  source={{
                    uri: avatar_url,
                  }}
                  width={100}
                  height={120}
                  style={{
                    borderRadius: 12,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text variant="h3">{full_name}</Text>
                  <Text flex={1} variant="p">
                    {address}
                  </Text>
                  <Box mt={16}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: primary200,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 8,
                      }}
                      onPress={() => {
                        try {
                          Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      <Text color={bg200} center>
                        Location
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>

      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          position: "absolute",
          right: 16,
          bottom: 48,
          backgroundColor: primary100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => {
            router.navigate("/criminals/new");
          }}
        >
          <Text color={bg200} fs={48} fw="300" lh={60}>
            +
          </Text>
        </Pressable>

        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
}
