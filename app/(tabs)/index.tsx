import { View, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Button, Card, Text, useTheme } from "react-native-paper";

//themed components
import TLink from "../../components/TLink";
import { useUser } from "../../hooks/use-users";
import { useCatalog } from "../../context/catalog-context";

export default function HomeScreen() {
  const { user, authChecked, logout } = useUser();
  const { catalog } = useCatalog();
  const router = useRouter();
  const theme = useTheme();

  const showCatalog = !!catalog && (catalog.length > 0 ? true : false);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
      <Text
        variant="headlineLarge"
        style={{ marginBottom: 24, textAlign: "center" }}
      >
        Välkommen till Varelse-jakten Borås!
      </Text>

      {authChecked && user && (
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>
              Konto
            </Text>
            <Text style={{ marginBottom: 16 }}>
              Inloggad som: {user.email}
            </Text>
            <Button mode="outlined" onPress={() => logout()} icon="logout">
              Logga ut
            </Button>
          </Card.Content>
        </Card>
      )}

      <Card>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>
            Kom igång
          </Text>
          <Text style={{ marginBottom: 16 }}>
            Börja leta efter varelser
          </Text>
          <Button
            mode="contained-tonal"
            onPress={() => router.push("/(tabs)/detektor")}
            icon="radar"
            style={{ marginBottom: 8 }}
          >
            Öppna detektorn
          </Button>
          {showCatalog && (
            <Button
              mode="text"
              onPress={() => router.push("/(tabs)/katalog")}
              icon="book-open-variant"
            >
              See din katalog
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}
