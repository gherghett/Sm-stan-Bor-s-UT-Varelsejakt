import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Colors } from "../constants/colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../context/user-context";
import { ThemeProvider } from "../context/theme-context";

export default function RootLayout() {
  let colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <ThemeProvider>
      <UserProvider>
        <StatusBar />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#ddd" },
            headerTintColor: "#333",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </ThemeProvider>
    // </SafeAreaView>
  );
}
