import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Colors } from "../constants/colors";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  let colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <>
    <StatusBar />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ddd" },
          headerTintColor: "#333",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
    // </SafeAreaView>
  );
}
