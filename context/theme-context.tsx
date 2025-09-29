import { appThemeDark, appThemeLight } from "../lib/theme";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { createContext, ReactNode, useState } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

interface ThemeContextType {
  setDarkmode: (isDark: boolean) => void;
  isDarkmode: boolean;
}

interface MyProviderProps {
  children: ReactNode;
}

export const MyThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: MyProviderProps) {
  const systemScheme = useColorScheme();
  const [isDarkmode, setDarkmode] = useState(systemScheme === "dark");
  
  const theme = isDarkmode ? appThemeDark : appThemeLight;

  return (
    <PaperProvider theme={theme}>
      <NavigationThemeProvider value={theme}>
        <MyThemeContext.Provider value={{ setDarkmode, isDarkmode }}>
          {children}
        </MyThemeContext.Provider>
      </NavigationThemeProvider>
    </PaperProvider>
  );
}
