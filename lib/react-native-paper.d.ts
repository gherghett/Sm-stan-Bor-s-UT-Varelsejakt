// src/types/react-native-paper.d.ts
import 'react-native-paper';
import { ViewStyle } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

// Create a custom theme type that extends MD3Theme
export type AppTheme = MD3Theme & {
  styles: {
    container: ViewStyle;
    title: ViewStyle;
  };
};
