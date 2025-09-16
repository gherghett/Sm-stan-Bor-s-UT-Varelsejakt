import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{
            headerStyle: { backgroundColor: "#ddd"},
            headerTintColor: "#333"
        }}>
            <Stack.Screen name="index" options={{title:"Home"}} />
            <Stack.Screen name="about" options={{title:"About"}} />
            <Stack.Screen name="contact" options={{title:"Contact"}} />
        </Stack>
    // </SafeAreaView>
  );
}
