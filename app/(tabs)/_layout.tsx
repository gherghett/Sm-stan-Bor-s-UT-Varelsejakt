import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/colors";
import UserOnly from "../../components/auth/user-only";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.background },
          tabBarActiveTintColor: theme.title,
          tabBarInactiveTintColor: theme.text,
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.text,
          headerTitleStyle: { color: theme.title },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-sharp" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarIcon: ({ color }) => <Ionicons name="book" color={color} />,
          }}
        />
      </Tabs>
    </UserOnly>
  );
}
