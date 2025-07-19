import { TouchableOpacity, View, ScrollView } from "react-native";
import React from "react";
import Text from "@/components/Text";
import Box from "@/components/Box";
import { useAppTheme } from "@/hooks/useAppTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const HomePage = () => {
  const { text100, bg200 } = useAppTheme();

  return (
    <Box flex={1} bg="#f6f8fa">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box align="center" mt={48} mb={24}>
          <Ionicons
            name="shield-checkmark"
            size={64}
            color={text100}
            style={{ marginBottom: 12 }}
          />
          <Text variant="h1" center fw="bold" fs={32} mb={4}>
            Police Mitra
          </Text>
          <Text variant="p" center color="#888" fs={16}>
            Hi, Welcome!
          </Text>
        </Box>
        <View style={{ paddingHorizontal: 24 }}>
          <Box gap={24}>
            <TouchableOpacity
              onPress={() => {
                router.push("/criminals");
              }}
              activeOpacity={1}
            >
              <View
                style={{
                  backgroundColor: bg200,
                  padding: 24,
                  borderRadius: 24,
                  shadowColor: "#000",
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="list-circle" size={56} color={text100} />
                <Text variant="h4" color={text100} mt={12} fw="bold">
                  CRIMINAL RECORDS
                </Text>
                <Text variant="p" color="#888" mt={4} fs={14}>
                  View and manage all criminal records
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/criminal-map");
              }}
              activeOpacity={1}
            >
              <View
                style={{
                  backgroundColor: bg200,
                  padding: 24,
                  borderRadius: 24,
                  shadowColor: "#000",
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="map" size={56} color={text100} />
                <Text variant="h4" color={text100} mt={12} fw="bold">
                  CRIMINAL MAP
                </Text>
                <Text variant="p" color="#888" mt={4} fs={14}>
                  Visualize all criminal locations on a map
                </Text>
              </View>
            </TouchableOpacity>
          </Box>
        </View>
        <View style={{ flex: 1 }} />
      </ScrollView>
    </Box>
  );
};

export default HomePage;
