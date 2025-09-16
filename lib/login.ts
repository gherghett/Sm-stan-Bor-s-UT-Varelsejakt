import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  OAuthProvider
} from "react-native-appwrite";

import {account} from "./appwrite"

// Create deep link that works across Expo environments
// Ensure localhost is used for the hostname to validation error for success/failure URLs
const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
const scheme = `${deepLink.protocol}//`; // e.g. 'exp://' or 'appwrite-callback-<PROJECT_ID>://'

// Start OAuth flow
const loginUrl = await account.createOAuth2Token({
  provider: OAuthProvider.Github,
  success: `${deepLink}`,
  failure: `${deepLink}`,
});

// Open loginUrl and listen for the scheme redirect
const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

// Extract credentials from OAuth redirect URL
let secret: string | null = null;
let userId: string | null = null;

if (result.type === "success" && result.url) {
  const url = new URL(result.url);
  secret = url.searchParams.get("secret");
  userId = url.searchParams.get("userId");
}

// Create session with OAuth credentials
if (secret && userId) {
  await account.createSession({
    userId,
    secret,
  });
}
// Redirect as needed