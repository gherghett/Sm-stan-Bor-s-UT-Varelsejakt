import { useRouter } from "expo-router";
import { useUser } from "../../hooks/use-users";
import { useEffect } from "react";
import TText from "../TText";
import { usePathname } from 'expo-router';


const UserOnly = ({ children }: { children: React.ReactNode }) => {
  const { user, authChecked , setHeadingTo} = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (authChecked && user === null) {
      setHeadingTo(pathname);
      router.replace("login");
    }
  }, [user, authChecked]);

  if (!authChecked || !user) {
    return <TText>Loading...</TText>;
  }

  return children;
};

export default UserOnly;
