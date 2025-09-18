export type AppwriteFunctionResult = {
  $createdAt: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  deploymentId: string;
  duration: number;
  errors: string;
  functionId: string;
  logs: string;
  requestHeaders: { name: string; value: string }[];
  requestMethod: string;
  requestPath: string;
  responseBody: string;
  responseHeaders: { name: string; value: string }[];
  responseStatusCode: number;
  scheduledAt: string | null;
  status: string;
  trigger: string;
};

export type AppwriteGetNearestResponseBody = {
  ok: boolean;
  count: number;
  radius_m: number;
  nearest: {
    id: string;
    name: string;
    lat: number;
    lng: number;
    distance_m: number;
    bearing_deg: number;
    sequence: number;
    imageId: string | null;
  };
  creatures: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    distance_m: number;
    bearing_deg: number;
    sequence: number;
    imageId: string | null;
  }>;
};

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

const functions = new Functions(client);

const GET_NEAR_CREATURES_FN_ID = "68cbec990000b4ced589";

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

// const promise = functions.createExecution({
//     functionId: GET_NEAR_CREATURES_FN_ID,
//     body: '<BODY>',  // optional
// });

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

const bucketId = "68cbb26a000c2134554d";

const storage = new Storage(client);

export function getCreatureImage(creatureId : string) {
  const url = storage.getFileDownloadURL(
      bucketId,
      `c-${creatureId}-big`
  );
  console.log(url);
  return url;
}

