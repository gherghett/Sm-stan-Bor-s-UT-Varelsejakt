import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import TView from "../../components/TView";
import TTitle from "../../components/TTitle";
import { useUser } from "../../hooks/use-users";
import UserOnly from "../../components/auth/user-only";

export default function Loggedin() {
  const { user, logout } = useUser();

  return (
    <UserOnly>
      <TView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        {user !== null && (
          <>
            <TTitle style={{ textAlign: "center" }}>
              You are Logged in as {user.email}
            </TTitle>
            <Button title="Log out" onPress={() => logout()} />
          </>
        )}
      </TView>
    </UserOnly>
  );
}

const styles = StyleSheet.create({});
