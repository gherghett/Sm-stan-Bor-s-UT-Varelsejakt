import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TLink from "../../components/TLink";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput, Card, useTheme } from "react-native-paper";

import { OAuthProvider } from "react-native-appwrite";
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
  const theme = useTheme();
  
  return (
    <View style={{ padding: 16, backgroundColor: theme.colors.background }}>
      {user && authChecked && (
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text>You are logged in as {user.email}</Text>
            <Button mode="outlined" onPress={() => logout()} style={{ marginTop: 12 }}>
              Log Out
            </Button>
          </Card.Content>
        </Card>
      )}
      
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
            <Text variant="headlineMedium" style={styles.title}>Login</Text>
            
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
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={(text) => setValue("password", text)}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
            
            <Button 
              mode="contained" 
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
            >
              Login
            </Button>
            
            {backEndError && (
              <Text style={styles.error}>{backEndError}</Text>
            )}
          </Card.Content>
        </Card>
      )}

      <Text style={{ textAlign: 'center' }}>
        Don't have an account? <TLink href="/signup">Register</TLink>
      </Text>
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
