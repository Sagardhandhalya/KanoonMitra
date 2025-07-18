import { TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Text from "@/components/Text";
import Box from "@/components/Box";
import { useAppTheme } from "@/hooks/useAppTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { supabase } from "@/utils/supabase";

const HomePage = () => {
  const { text100, bg200 } = useAppTheme();

  return (
    <Box ph={16} bg="#fff" flex={1}>
      <Text variant="h1" center mt={32}>
        Hi, Welcome!
      </Text>

      <Box horizontal justify="space-between" align="center" gap={32} mt={32}>
        <TouchableOpacity
          onPress={() => {
            router.push("/criminals");
          }}
        >
          <Box bg={bg200} padding={16} br={16} justify="center" align="center">
            <Ionicons name="list-circle" size={64} />
            <Text variant="h4" color={text100} mt={8}>
              CRIMINAL RECORDS
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default HomePage;
