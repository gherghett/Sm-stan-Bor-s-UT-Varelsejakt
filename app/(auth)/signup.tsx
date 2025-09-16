import { StyleSheet } from "react-native";
import React from "react";
import TView from "../../components/TView";
import TText from "../../components/TText";
import TTextInput from "../../components/TTextInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/use-users";

const signupSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 6 characters" }),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const {user, register} = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await register(data.email, data.password);
      console.log("current user: ", user);
      // Handle success (e.g., navigate to login or home)
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  return (
    <TView>
      <TText style={styles.title}>Sign Up</TText>
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
        Sign Up
      </TText>
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
