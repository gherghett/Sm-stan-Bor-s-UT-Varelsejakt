// TEMPLATE: lib/theme.tsx
// Technical implementation for unified React Navigation + Paper theming
// Get your complete theme from: https://callstack.github.io/react-native-paper/docs/guides/theming

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

// Adapt navigation themes to work with Paper (required for compatibility)
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
const customLightColors = {
  colors: {
    // Paste your complete light theme from React Native Paper theme builder
    primary: "rgb(176, 46, 0)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 219, 209)",
    onPrimaryContainer: "rgb(59, 9, 0)",
    
    secondary: "rgb(119, 87, 78)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 219, 209)",
    onSecondaryContainer: "rgb(44, 21, 15)",
    
    tertiary: "rgb(108, 93, 47)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(246, 225, 166)",
    onTertiaryContainer: "rgb(35, 27, 0)",    
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 24)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 24)",

    // Surface variants
    surfaceVariant: "rgb(245, 222, 216)",
    onSurfaceVariant: "rgb(83, 67, 63)",
    outline: "rgb(133, 115, 110)",
    outlineVariant: "rgb(216, 194, 188)",

    // System colors
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 45)",
    inverseOnSurface: "rgb(251, 238, 235)",
    inversePrimary: "rgb(255, 181, 160)",

    // Elevation levels (shadows/depth)
    elevation: {
      level0: "transparent",
      level1: "rgb(251, 241, 242)",
      level2: "rgb(249, 235, 235)",
      level3: "rgb(246, 229, 227)",
      level4: "rgb(246, 226, 224)",
      level5: "rgb(244, 222, 219)",
    },

    // Disabled states
    surfaceDisabled: "rgba(32, 26, 24, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 24, 0.38)",
    backdrop: "rgba(59, 45, 41, 0.4)",
  },
} as const;

// Your custom dark theme from React Native Paper theme builder
const customDarkColors = {
  colors: {
    // Paste your complete dark theme from React Native Paper theme builder
    primary: "rgb(255, 181, 160)",
    onPrimary: "rgb(96, 21, 0)",
    primaryContainer: "rgb(135, 33, 0)",
    onPrimaryContainer: "rgb(255, 219, 209)",
    
    secondary: "rgb(231, 189, 178)",
    onSecondary: "rgb(68, 42, 34)",
    secondaryContainer: "rgb(93, 64, 55)",
    onSecondaryContainer: "rgb(255, 219, 209)",
    
    tertiary: "rgb(217, 197, 141)",
    onTertiary: "rgb(59, 47, 5)",
    tertiaryContainer: "rgb(83, 70, 25)",
    onTertiaryContainer: "rgb(246, 225, 166)",    
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    
    background: "rgb(32, 26, 24)",
    onBackground: "rgb(237, 224, 221)",
    surface: "rgb(32, 26, 24)",
    onSurface: "rgb(237, 224, 221)",

    // Surface variants
    surfaceVariant: "rgb(83, 67, 63)",
    onSurfaceVariant: "rgb(216, 194, 188)",
    outline: "rgb(160, 140, 135)",
    outlineVariant: "rgb(83, 67, 63)",

    // System colors
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(237, 224, 221)",
    inverseOnSurface: "rgb(54, 47, 45)",
    inversePrimary: "rgb(176, 46, 0)",

    // Elevation levels (darker surfaces for depth)
    elevation: {
      level0: "transparent",
      level1: "rgb(43, 34, 31)",
      level2: "rgb(50, 38, 35)",
      level3: "rgb(57, 43, 39)",
      level4: "rgb(59, 45, 40)",
      level5: "rgb(63, 48, 43)",
    },

    // Disabled states
    surfaceDisabled: "rgba(237, 224, 221, 0.12)",
    onSurfaceDisabled: "rgba(237, 224, 221, 0.38)",
    backdrop: "rgba(59, 45, 41, 0.4)",
  },
} as const;

// Final app themes combining base themes with custom colors
export const appThemeLight: CombinedTheme = deepmerge(
  combinedDefaultTheme,
  customLightColors
);

export const appThemeDark: CombinedTheme = deepmerge(
  combinedDarkTheme, 
  customDarkColors
);

// 💡 TECHNICAL IMPLEMENTATION NOTES:
// 
// 1. Get complete themes from: https://callstack.github.io/react-native-paper/docs/guides/theming
// 2. The CombinedTheme type ensures compatibility with both libraries
// 3. adaptNavigationTheme() is required for proper Navigation theming
// 4. deepmerge() combines themes while preserving all required properties
// 5. Both PaperProvider and NavigationThemeProvider use the same theme object
// 
// KEY TECHNICAL POINTS:
// - Type safety: CombinedTheme = NavigationTheme & MD3Theme
// - Compatibility: adaptNavigationTheme ensures Navigation works with Paper themes
// - Merging: deepmerge preserves the complete theme structure
// - Provider order: PaperProvider wraps NavigationThemeProvider