import React from "react";
import TLink from "../../components/TLink";
import { ThemeToggle } from "../../components/ThemeToggle";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";

export default function About() {
  const theme = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text variant="headlineMedium">About</Text>
      <ThemeToggle />
      <TLink
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        onPress={() => {}}
        href="/contact"
      >
        Contact
      </TLink>
      <TLink
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        onPress={() => {}}
        href="/"
      >
        home
      </TLink>
    </View>
  );
}
