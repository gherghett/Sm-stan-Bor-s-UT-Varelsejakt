import { Button, StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { Colors } from "../../constants/colors";

export default function Contact() {
  const router = useRouter();
    let colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Contact Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
