import {
  StyleProp,
  Text,
  TextStyle,
} from "react-native";
import React from "react";
import { useTheme } from "../context/theme-context";

// type TTextProps = {
//   style?: StyleProp<TextStyle>;
//   children?: React.ReactNode;
//   // ...other props
// };

export default function TTitle({ style, children, ...props }: React.ComponentProps<typeof Text>) {
  const { theme } = useTheme();
  return (
    <Text style={[{ fontSize: 30, color: theme.text }, style]} {...props}>
      {children}
    </Text>
  );
}
