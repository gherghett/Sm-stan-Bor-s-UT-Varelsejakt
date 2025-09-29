import React, { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/colors";
import { useUser } from "../hooks/use-users";
import { PaperProvider } from "react-native-paper";

// Type for individual theme (light or dark)
type Theme = typeof Colors.light;

// Type for the context value
interface ThemeContextType {
  theme: Theme;
  colorScheme: "light" | "dark";
  isDark: boolean;
  isLight: boolean;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const currentScheme = colorScheme ?? "light";
  const theme = Colors[currentScheme];
  const { user } = useUser();

  const value: ThemeContextType = {
    theme,
    colorScheme: currentScheme,
    isDark: currentScheme === "dark",
    isLight: currentScheme === "light",
  };

  return (
    <PaperProvider>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </PaperProvider>
  );
}

// Custom hook to use the theme
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
