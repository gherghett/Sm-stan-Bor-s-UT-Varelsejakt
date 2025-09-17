import { Button, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TTextInput from "../../components/TTextInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/use-users";
import { useNavigation, useRouter } from "expo-router";
import TTitle from "../../components/TTitle";

const signupSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters" }),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    user,
    register,
    login,
    logout,
    authChecked,
    headingTo,
    setHeadingTo,
  } = useUser();
  const router = useRouter();
  const [backEndError, setBackEndError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Sign Up" });
  }, [navigation]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  //forward user if he successfully logged in if he was heading somehwhere
  useEffect(() => {
    if (user !== null && authChecked) {
      if (headingTo !== null) {
        router.push(headingTo);
        setHeadingTo(null);
      }
    }
  }, [user, authChecked]);

  const onSubmit = async (data: SignupForm) => {
    setBackEndError(null);
    try {
      console.log("register");
      await register(data.email, data.password);
      await login(data.email, data.password);
      console.log("current user: ", user);
      // Handle success (e.g., navigate to login or home)
    } catch (error) {
      console.log("error");

      console.error("Signup error:", error);

      setBackEndError((error as Error).message);
    }
  };

  return (
    <TView>
      <TText style={styles.title}>Sign Up</TText>
      {!authChecked && <TText>Loading...</TText>}
      {!!!user && authChecked && (
        <View>
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
          {backEndError && <TText style={styles.error}>{backEndError}</TText>}
          <TText style={styles.button} onPress={handleSubmit(onSubmit)}>
            Sign Up
          </TText>
        </View>
      )}
      {!!user && authChecked && (
        <TText>
          You are logged in.
          <Button title="Log Out" onPress={() => logout()} />
          to sign up.
        </TText>
      )}
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
