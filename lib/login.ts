import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { OAuthProvider } from "react-native-appwrite";

import { account } from "./appwrite";

// Wrap the OAuth flow in an async function
export async function loginWithOAuth(provider: OAuthProvider) {
  // Create deep link for redirect
  const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
  const scheme = `${deepLink.protocol}//`;

  // Start OAuth flow
  const loginUrl = await account.createOAuth2Token({
    provider,
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
    return { userId, secret };
  } else {
    throw new Error("OAuth flow was not successful or missing credentials");
  }
}
