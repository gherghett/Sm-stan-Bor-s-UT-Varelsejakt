import { View, Text, useColorScheme, Button } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Colors } from "../../constants/colors";

//themed components
import TView from "../../components/TView";
import TLink from "../../components/TLink";
import { useUser } from "../../hooks/use-users";
import TText from "../../components/TText";

export default function HomeScreen() {
  const { user, authChecked, logout } = useUser();
  const router = useRouter();
  let colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <TView style={{ flex: 1 }}>
      <Text style={{ color: theme.text }}>Home Page</Text>
      {authChecked && !!user && (
        <>
          <TText>Logged in as: {user.email}</TText>
          <Button title="Log Out" onPress={() => logout()} />
        </>
      )}
      {authChecked && !!!user && (
        <Button title="Log in" onPress={() => router.push('/login')} />
      )}
    </TView>
  );
}
