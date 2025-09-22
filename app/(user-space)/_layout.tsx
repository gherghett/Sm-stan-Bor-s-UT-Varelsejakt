import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";
import UserOnly from "../../components/auth/user-only";
import { CatalogProvider } from "../../context/catalog-context";
import { Colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserSpaceLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <UserOnly>
      <CatalogProvider>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: theme.navBackground },
              headerTintColor: theme.text,
              headerTitleStyle: { color: theme.title },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="encounter"
              options={{
                headerShown: true,
                title: "Encounter",
                presentation: "card",
              }}
            />
          </Stack>
      </CatalogProvider>
    </UserOnly>
  );
}
