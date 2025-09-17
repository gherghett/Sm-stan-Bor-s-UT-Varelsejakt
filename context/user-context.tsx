import { createContext, ReactNode, useEffect, useState } from "react";
import { account, AppwriteUser } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

interface UserContextType {
  user: AppwriteUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
  headingTo: string | null;
  setHeadingTo: (headingTo : string | null) => void;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [headingTo, setHeadingTo] = useState<string | null>(null);

  async function getInitialUseValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }
  useEffect(() => {
    getInitialUseValue();
  }, []);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession({
        email,
        password,
      });
      const response = await account.get();
      setUser(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function register(email: string, password: string) {
    try {
      const response = await account.create({
        userId: ID.unique(),
        email,
        password,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function logout() {
    try {
      await account.deleteSession({ sessionId: "current" });
      setUser(null);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked, headingTo, setHeadingTo}}
    >
      {children}
    </UserContext.Provider>
  );
}
