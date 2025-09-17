import { StyleSheet } from "react-native";
import React from "react";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TTextInput from "../../components/TTextInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { OAuthProvider } from "react-native-appwrite";
import TLink from "../../components/TLink";
import { useUser } from "../../hooks/use-users";
import { useRouter } from "expo-router";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { user, login } = useUser();
  const router = useRouter();
  if (user !== null) {
    router.push("/loggedin");
  }

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
    console.log(user);
    try {
      await login(data.email, data.password);
      console.log("current user: ", user);
      // Handle success (e.g., navigate to login or home)
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  //Potatis12345678 password
  return (
    <TView>
      {user && <TText>You are logged in as {user.email}</TText>}
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
