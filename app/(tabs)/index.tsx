import { View, Text, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Colors } from "../../constants/colors";

export default function HomeScreen() {
    let colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Home Page</Text>
    </View>
  );
}
