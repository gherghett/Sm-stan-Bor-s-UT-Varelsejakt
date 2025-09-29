import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

type TViewProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export default function TView({ style, children, ...props }: TViewProps) {
  const theme = useTheme();
  return (
    <View style={[{ backgroundColor: theme.colors.background }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
