# React Native Unified Theming Guide

This guide explains the technical implementation of a unified theming solution for Expo projects that combines React Navigation and React Native Paper themes with dynamic theme switching.

## Overview

This theming solution provides:
- **Unified theme system** combining React Navigation and React Native Paper
- **Dynamic theme switching** between light and dark modes
- **System preference detection** with manual override capability
- **Type-safe theme context** for accessing theme state throughout the app
- **Compatible theme objects** that work seamlessly with both libraries

## Architecture

The theming system consists of 3 main components:

1. **Theme Definitions** (`lib/theme.tsx`) - Combines Paper and Navigation themes
2. **Theme Context** (`lib/theme-context.tsx`) - Provides theme state management
3. **App Layout** (`app/_layout.tsx`) - Wraps the app with theme providers

## Implementation Steps

### 1. Install Required Dependencies

```bash
npm install react-native-paper @react-navigation/native deepmerge
# or
yarn add react-native-paper @react-navigation/native deepmerge
```

**Note:** Get your complete theme objects from the [React Native Paper Theme Builder](https://callstack.github.io/react-native-paper/docs/guides/theming) before proceeding.

### 2. Create Theme Definitions

Create `lib/theme.tsx`:

```tsx
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import deepmerge from "deepmerge";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";

type CombinedTheme = NavigationTheme & MD3Theme;

// Ensure Navigation and Paper theme compatibility
adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Base combined themes
export const combinedDarkTheme: CombinedTheme = deepmerge(NavigationDarkTheme, MD3DarkTheme);
export const combinedDefaultTheme: CombinedTheme = deepmerge(
  NavigationDefaultTheme,
  MD3LightTheme
);

// Your custom light theme from React Native Paper theme builder
const customLightTheme = {
  colors: {
    // Paste your complete theme from https://callstack.github.io/react-native-paper/docs/guides/theming
    primary: "rgb(176, 46, 0)",
    onPrimary: "rgb(255, 255, 255)",
    // ... rest of your complete theme
  },
} as const;

// Your custom dark theme from React Native Paper theme builder
const customDarkTheme = {
  colors: {
    // Paste your complete theme from https://callstack.github.io/react-native-paper/docs/guides/theming
    primary: "rgb(255, 181, 160)",
    onPrimary: "rgb(96, 21, 0)",
    // ... rest of your complete theme
  },
} as const;

// Final combined themes for both Navigation and Paper
export const appThemeLight: CombinedTheme = deepmerge(
  combinedDefaultTheme,
  customLightTheme
);
export const appThemeDark: CombinedTheme = deepmerge(combinedDarkTheme, customDarkTheme);
```

### 3. Create Theme Context Provider

Create `lib/theme-context.tsx`:

```tsx
import { appThemeDark, appThemeLight } from "@/lib/theme";
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

export function MyThemeProvider({ children }: MyProviderProps) {
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
```

### 4. Wrap Your App with the Theme Provider

In your root layout (e.g., `app/_layout.tsx`):

```tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MyThemeProvider } from "@/lib/theme-context";

export default function RootLayout() {
  return (
    <MyThemeProvider>
      <Stack>
        {/* Your screens */}
      </Stack>
      <StatusBar style="auto" />
    </MyThemeProvider>
  );
}
```

### 5. Use the Theme in Components

```tsx
import { MyThemeContext } from "@/lib/theme-context";
import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";

export default function Settings() {
  const { setDarkmode, isDarkmode } = useContext(MyThemeContext);
  
  return (
    <View>
      <Text>Current theme: {isDarkmode ? "Dark" : "Light"}</Text>
      <Switch 
        value={isDarkmode} 
        onValueChange={setDarkmode}
      />
      <Button mode="contained">Themed Button</Button>
    </View>
  );
}
```

## Technical Implementation Details

### 1. Unified Theme Type

The `CombinedTheme` type merges React Navigation's `Theme` with React Native Paper's `MD3Theme`, ensuring type safety across both libraries:

```tsx
type CombinedTheme = NavigationTheme & MD3Theme;
```

### 2. Theme Compatibility

The `adaptNavigationTheme` function from React Native Paper ensures the Navigation themes are compatible with Paper's theming system:

```tsx
adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
```

### 3. Deep Merging Strategy

Using `deepmerge` combines the base themes with your custom themes while preserving all required properties:

```tsx
export const appThemeLight: CombinedTheme = deepmerge(
  combinedDefaultTheme,
  customLightTheme
);
```

### 4. Dual Provider Architecture

The theme context wraps both `PaperProvider` and `NavigationThemeProvider` with the same theme object:

```tsx
<PaperProvider theme={theme}>
  <NavigationThemeProvider value={theme}>
    {children}
  </NavigationThemeProvider>
</PaperProvider>
```

### 5. System Theme Detection

The context automatically detects the user's system preference and initializes accordingly:

```tsx
const systemScheme = useColorScheme();
const [isDarkmode, setDarkmode] = useState(systemScheme === "dark");
```

## Working with Custom Themes

### Getting Your Theme

1. Visit the [React Native Paper Theme Builder](https://callstack.github.io/react-native-paper/docs/guides/theming)
2. Customize your colors and generate both light and dark themes
3. Copy the complete theme objects into your `customLightTheme` and `customDarkTheme` constants

### Extending the Context

To add more theme-related state, extend the `ThemeContextType` interface:

```tsx
interface ThemeContextType {
  setDarkmode: (isDark: boolean) => void;
  isDarkmode: boolean;
  // Add more theme-related state
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}
```

## Best Practices

1. **Use complete themes** - Always use complete theme objects from the Paper theme builder
2. **Test both themes** - Always verify your UI works in both light and dark modes
3. **Maintain theme consistency** - Ensure both Navigation and Paper use the same theme object
4. **Type safety** - Leverage TypeScript with the `CombinedTheme` type
5. **Performance** - The theme context only re-renders when theme changes
6. **Provider order** - Always wrap PaperProvider around NavigationThemeProvider

## Troubleshooting

### Common Issues

1. **Navigation colors not applying**: Ensure you're calling `adaptNavigationTheme` in your theme file
2. **TypeScript errors**: Verify your theme objects match the `CombinedTheme` type
3. **Provider conflicts**: Make sure PaperProvider wraps NavigationThemeProvider
4. **Incomplete themes**: Use complete theme objects from the Paper theme builder
5. **System theme not detected**: Check that `useColorScheme` is properly imported

### Verifying Theme Integration

Create a test component to verify both libraries use the same theme:

```tsx
import { useTheme } from 'react-native-paper';
import { useTheme as useNavigationTheme } from '@react-navigation/native';

function ThemeIntegrationTest() {
  const paperTheme = useTheme();
  const navTheme = useNavigationTheme();
  
  // These should be the same
  console.log('Paper primary:', paperTheme.colors.primary);
  console.log('Navigation primary:', navTheme.colors.primary);
  
  return (
    <View style={{ backgroundColor: paperTheme.colors.background }}>
      <Text style={{ color: paperTheme.colors.onBackground }}>
        Unified theming working!
      </Text>
    </View>
  );
}
```

## Conclusion

This theming solution provides a robust, type-safe way to unify React Navigation and React Native Paper themes. The technical implementation ensures both libraries share the same theme object, providing consistent styling across your entire application. By using `adaptNavigationTheme`, `deepmerge`, and proper provider architecture, you get seamless theme integration with dynamic switching capabilities.