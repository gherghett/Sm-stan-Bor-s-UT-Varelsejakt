import { Button, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TTextInput from "../../components/TTextInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { OAuthProvider } from "react-native-appwrite";
import TLink from "../../components/TLink";
import { useUser } from "../../hooks/use-users";
import { useNavigation, useRouter } from "expo-router";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { user, login, authChecked, headingTo, setHeadingTo, logout } =
    useUser();
  const router = useRouter();
  const navigation = useNavigation();

  const [backEndError, setBackEndError] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Log In" });
  }, [navigation]);

  //fowrads user if he successfully logged in if he was heading somehwhere
  useEffect(() => {
    if (user !== null && authChecked) {
      if (headingTo !== null) {
        router.push(headingTo);
        setHeadingTo(null);
      }
    }
  }, [user, authChecked]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    setBackEndError(null);
    try {
      await login(data.email, data.password);
      console.log("current user: ", user);
      // Handle success (e.g., navigate to login or home)
    } catch (error) {
      // Handle error (e.g., show error message)
      setBackEndError((error as Error).message);
    }
  };

  //Potatis12345678 password
  return (
    <TView>
      {user && authChecked && <TText>You are logged in as {user.email}</TText>}
      {!authChecked && <TText>Loading...</TText>}
      {!!!user && authChecked && (
        <View>
          <TText style={styles.title}>Login</TText>
          <TTextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => setValue("email", text)}
            style={styles.input}
          />
          {errors.email && (
            <TText style={styles.error}>{errors.email.message}</TText>
          )}
          <TTextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setValue("password", text)}
            style={styles.input}
          />
          {errors.password && (
            <TText style={styles.error}>{errors.password.message}</TText>
          )}
          <TText style={styles.button} onPress={handleSubmit(onSubmit)}>
            Login
          </TText>
        </View>
      )}
      {backEndError && <TText style={styles.error}>{backEndError}</TText>}
      {!!user && authChecked && (
        <Button title="Log Out" onPress={() => logout()} />
      )}

      <TText>
        Dont have an account? <TLink href="/signup">register</TLink>
      </TText>

      {/* <TText
            disabled bc does not work in expo
        style={styles.button}
        onPress={async () => {
          try {
            const result = await loginWithOAuth(OAuthProvider.Github);
            console.log('GitHub OAuth login successful:', result);
          } catch (error) {
            console.log('GitHub OAuth login failed:', error);
          }
        }}
      >
        Login with GitHub
      </TText> */}
    </TView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#6849a7",
    color: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 16,
  },
});
