import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

export default function Contact() {
    const router = useRouter();
  return (
    <View>
      <Text>Contact</Text>
      <Link
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        href="/contact"
      >
        Contact
      </Link>
      <Button title="About" onPress={() => router.dismissTo("/about")} />
    </View>
  );
}

const styles = StyleSheet.create({});
