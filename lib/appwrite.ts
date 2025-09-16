import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  Client,
  Account,
  Avatars,
  ID,
  Models,
} from "react-native-appwrite";
import React, { useState } from "react";

// let account: Account;

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your Project ID
//   .setPlatform('xyz.grgta.poke');   // Your package name / bundle identifier

export const account = new Account(client);

export const avatars = new Avatars(client);

export interface AppwriteUser {
  $id: string;
  email: string;
  name?: string;
  // Add other fields as needed
  [key: string]: any;
}

//gherghetta@gmail.com Potatis12345678

