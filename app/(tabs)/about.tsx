import React from "react";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TLink from "../../components/TLink";

export default function About() {
  return (
    <TView style={{ flex: 1 }}>
      <TText>About</TText>
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
