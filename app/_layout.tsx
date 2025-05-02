import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="criminals/index" />
        <Stack.Screen name="criminals/new" />
        <Stack.Screen name="criminals/:id" />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
