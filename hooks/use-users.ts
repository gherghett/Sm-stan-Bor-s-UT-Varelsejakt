import { useContext } from "react";

import { UserContext } from "../context/user-context";

export function useUser()  {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be within a UserProvider");
  }

  return context;
}
