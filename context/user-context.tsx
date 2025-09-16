import { createContext, ReactNode, useState } from "react";
import { account, AppwriteUser } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

interface UserContextType {
  user: AppwriteUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppwriteUser | null>(null);

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
    }
  }

  async function logout() {}
  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
