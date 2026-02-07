import "../global.css";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import NfcManager from "react-native-nfc-manager";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      NfcManager.start().catch(() => {});
    }
  }, []);
  return (
    <View className="flex-1 bg-black" style={{ flex: 1, backgroundColor: "#000000" }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000000" },
          animation: "slide_from_right",
        }}
      />
    </View>
  );
}
