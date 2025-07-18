import Box from "@/components/Box";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useAppTheme } from "@/hooks/useAppTheme";
import { supabase } from "@/utils/supabase";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  const { primary100, primary200, text100, bg200 } = useAppTheme();
  const [criminals, setCriminals] = useState<ICriminal[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("criminals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCriminals(data);
    } catch (e) {
      console.log(e, ".====");
    }
  };

  useFocusEffect(() => {
    fetchData();
  });

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <Text variant="h2" center mv={16}>
          Criminal List
        </Text>
        <Input
          placeholder="search name"
          keyboardType="number-pad"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />

        {criminals.filter((item) =>
          item.full_name.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <View style={{ alignItems: "center", marginTop: 64 }}>
            <Ionicons
              name="people-outline"
              size={64}
              color={text100}
              style={{ marginBottom: 16 }}
            />
            <Text variant="h2" center mb={8} color={text100}>
              No Records Found
            </Text>
            <Text variant="p" center color={text100} fs={16} lh={22}>
              There are no criminal records to display.
            </Text>
          </View>
        )}
        {criminals
          .filter((item) =>
            item.full_name.toLowerCase().includes(search.toLowerCase())
          )
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
                  <Box mt={16} horizontal gap={8}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: primary200,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        try {
                          Linking.openURL(
                            `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
                          );
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      <Ionicons
                        name="map"
                        size={18}
                        color={bg200}
                        style={{ marginRight: 6 }}
                      />
                      <Text color={bg200} center>
                        View on Map
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: text100,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() =>
                        router.push({
                          pathname: "/criminals/[id]/edit",
                          params: { id },
                        })
                      }
                    >
                      <Ionicons
                        name="create-outline"
                        size={18}
                        color={bg200}
                        style={{ marginRight: 6 }}
                      />
                      <Text color={bg200} center>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>

      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          right: 24,
          bottom: 32,
          zIndex: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.navigate("/criminals/new");
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: primary100,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOpacity: 0.18,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          }}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
