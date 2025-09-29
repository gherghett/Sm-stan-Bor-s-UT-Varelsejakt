import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/use-users";
import { useNavigation, useRouter } from "expo-router";
import { Button, Text, TextInput, Card, useTheme } from "react-native-paper";

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

  const theme = useTheme();
  
  return (
    <View style={{ padding: 16, backgroundColor: theme.colors.background }}>
      {!authChecked && (
        <Card>
          <Card.Content>
            <Text>Loading...</Text>
          </Card.Content>
        </Card>
      )}
      
      {!!!user && authChecked && (
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>Sign Up</Text>
            
            <TextInput
              label="Email"
              mode="outlined"
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setValue("email", text)}
              style={styles.input}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
            
            <TextInput
              label="Password"
              mode="outlined"
              placeholder="Enter your password (min 8 characters)"
              secureTextEntry
              onChangeText={(text) => setValue("password", text)}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
            
            {backEndError && (
              <Text style={styles.error}>{backEndError}</Text>
            )}
            
            <Button 
              mode="contained" 
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
            >
              Sign Up
            </Button>
          </Card.Content>
        </Card>
      )}
      
      {!!user && authChecked && (
        <Card>
          <Card.Content>
            <Text style={{ marginBottom: 12 }}>
              You are already logged in.
            </Text>
            <Button mode="outlined" onPress={() => logout()}>
              Log Out
            </Button>
            <Text style={{ marginTop: 8, opacity: 0.7 }}>
              Log out to create a new account.
            </Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
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
    marginTop: 16,
  },
});
