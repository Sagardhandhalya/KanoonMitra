import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "./../global.css";
import Toast from "react-native-toast-message";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { View, ActivityIndicator } from "react-native";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="criminals/index" />
        <Stack.Screen name="criminals/new" />
        <Stack.Screen name="criminals/[id]" />
        <Stack.Screen name="criminals/[id]/edit" />
        <Stack.Screen name="test" />
      </Stack>
      <Toast />
    </SafeAreaView>
  );
};

export default RootLayout;
