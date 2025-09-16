import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Ionicons name="home-sharp" />,
        }}
      />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
}
