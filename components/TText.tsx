import {
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

type TTextProps = {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  // ...other props
};

export default function TText({ style, children, ...props }: TTextProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <Text style={[{ color: theme.text }, style]} {...props}>
      {children}
    </Text>
  );
}
