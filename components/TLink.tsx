import React from "react";
import { Text, useColorScheme, StyleProp, TextStyle } from "react-native";
import  {Link} from "expo-router"
import { Colors } from "../constants/colors";

// you could add props like this
// type TLinkProps = React.ComponentProps<typeof Link> & {
//   style?: StyleProp<TextStyle>;
//   children?: React.ReactNode;
// };

export default function TLink({ style, children, onPress, ...props }: React.ComponentProps<typeof Link>) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <Link {...props}>
      <Text style={[{ color: theme.link, textDecorationLine: "underline" }, style]}>
        {children}
      </Text>
    </Link>
  );
}
