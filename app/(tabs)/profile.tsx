import { Button, StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { Colors } from "../../constants/colors";
import UserOnly from "../../components/auth/user-only";

export default function Profile() {
  const router = useRouter();
  let colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <UserOnly>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Contact Page</Text>
      </View>
    </UserOnly>
  );
}

const styles = StyleSheet.create({});
