import React from "react";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TLink from "../../components/TLink";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function About() {
  return (
    <TView style={{ flex: 1 }}>
      <TText>About</TText>
      <ThemeToggle />
      <TLink
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        onPress={() => {}}
        href="/contact"
      >
        Contact
      </TLink>
      <TLink
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        onPress={() => {}}
        href="/"
      >
        home
      </TLink>
    </TView>
  );
}

// ...existing code...
