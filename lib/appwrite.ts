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
  TablesDB,
  Query,
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
  console.log(result.responseBody);
  return JSON.parse(result.responseBody);
}

const CAPTURE_CREATURE_FN_ID = "68cd0b6b001201e469e0";
export async function captureCreatureAsync(
  userLat: string,
  userLong: string,
  creatureId: string
) {
  console.log("in fånga fucntion");
  const result = await functions.createExecution({
    functionId: CAPTURE_CREATURE_FN_ID,
    body: JSON.stringify({
      lat: userLat,
      lng: userLong,
      creature_id: creatureId,
    }),
  });
  console.log("end");
  return JSON.parse(result.responseBody);
}

const GET_CATALOG_FN_ID = "68cd44ad0038458c10d6";
export async function getUserCreatureCatalog(
  user: AppwriteUser
): Promise<Result<Creature[]>> {
  try {
    const result = await functions.createExecution({
      functionId: GET_CATALOG_FN_ID,
    });
    const body = JSON.parse(result.responseBody);
    const creatures = body.creatures.map((creature: any) => ({
      ...creature,
      imageUrl: storage.getFileDownloadURL(bucketId, `c-${creature.$id}-big`).toString()
    }));
    return { status: "success", result: creatures as Creature[] };
  } catch (e) {
    console.log(e);
    return { status: "fail" };
  }
}

//------------------- Storage ----------------------------
const storage = new Storage(client);
const bucketId = "68cbb26a000c2134554d";
// TODO: add non happy paths
export function getCreatureImage(creatureId: string) {
  const url = storage.getFileDownloadURL(bucketId, `c-${creatureId}-big`).toString();
  console.log(url);
  return url;
}

export function getImageUrl(id:string) {
  console.log("trying to get image:", id);
  const url = storage.getFileDownloadURL(bucketId, id);
  console.log(url);
  return url.toString();
}

import type { Result } from "./result";

export interface Creature {
  $id: string;
  name: string;
  lat: number;
  long: number;
  $createdAt: string; // ISO date string or human-readable date
  $updatedAt: string; // ISO date string or human-readable date
  requires: string[]; // empty array if none
  clue: string | null; // nullable
  imageUrl: string;
}
