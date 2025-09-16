import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Slot />
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
  );
}
