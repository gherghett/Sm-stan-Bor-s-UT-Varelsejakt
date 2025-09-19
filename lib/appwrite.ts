//------------------- Imports -------------------
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
  Functions,
  Storage,
  Account,
  Avatars,
  ID,
  Models,
} from "react-native-appwrite";
import React, { useState } from "react";
import {
  AppwriteFunctionResult,
  AppwriteGetNearestResponseBody,
} from "./appwrite-types";

//------------------- Appwrite Client Setup -------------------
export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your Project ID
//   .setPlatform('xyz.grgta.poke');   // Your package name / bundle identifier

export const account = new Account(client);
export const avatars = new Avatars(client); //not used

//------------------- Interfaces -------------------
export interface AppwriteUser {
  $id: string;
  email: string;
  name?: string;
  // Add other fields as needed
  [key: string]: any;
}

//---------------------------------------------------------
//------------------- Appwrite Services -------------------
//---------------------------------------------------------

//------------------- Functions ---------------------------
const functions = new Functions(client);
const GET_NEAR_CREATURES_FN_ID = "68cbec990000b4ced589";
// TODO: add non happy paths, validate result object with zod?
export async function getCreaturesNearAsync(
  userLat: string,
  userLong: string
): Promise<AppwriteGetNearestResponseBody> {
  const result = await functions.createExecution({
    functionId: GET_NEAR_CREATURES_FN_ID,
    body: `{ "lat": ${userLat}, "lng": ${userLong}, "radius": 200 }`,
  });
  return JSON.parse(result.responseBody);
}

const CAPTURE_CREATURE_FN_ID = "68cd0b6b001201e469e0";
export async function captureCreatureAsync(
  userLat: string,
  userLong: string,
  creatureId: string
) {
  console.log("in fånga fucntion")
  const result = await functions.createExecution({
    functionId: CAPTURE_CREATURE_FN_ID,
    body: JSON.stringify({
      lat: userLat,
      lng: userLong,
      creature_id: creatureId,
    }),
  });
  console.log("end")
  return JSON.parse(result.responseBody);
}

//------------------- Storage ----------------------------
const storage = new Storage(client);
const bucketId = "68cbb26a000c2134554d";
// TODO: add non happy paths
export function getCreatureImage(creatureId : string) {
  const url = storage.getFileDownloadURL(
      bucketId,
      `c-${creatureId}-big`
  );
  console.log(url);
  return url;
}

