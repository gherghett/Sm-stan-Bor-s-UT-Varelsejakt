import { useRouter } from "expo-router";
import { useUser } from "../../hooks/use-users";
import { useEffect } from "react";
import TText from "../TText";

const UserOnly = ({ children }: { children: React.ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("login");
    }
  }, [user, authChecked]);

  if (!authChecked || !user) {
    return <TText>Loading...</TText>;
  }

  return children;
};

export default UserOnly;
