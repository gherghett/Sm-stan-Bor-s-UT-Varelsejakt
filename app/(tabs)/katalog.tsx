import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Creature, getUserCreatureCatalog } from "../../lib/appwrite";
import { useUser } from "../../hooks/use-users";
import type { Result } from "../../lib/result";

export default function katalog() {
  const [katalog, setKatalog] = useState<Creature[] | null>(null);
  const {authChecked, user} = useUser();
  useEffect(() => {
    if(!authChecked || !!!user) return;
    (async () => {
      const katalogResult : Result<Creature[]> = await getUserCreatureCatalog(user);
      if(katalogResult.status == "fail") return;
      setKatalog(katalogResult.result)
    })();
  }, [authChecked, user]);


  return (
    <View>
      {!katalog && <Text>Loading....</Text>}
      {katalog && <Text>{katalog.map((c) =><Text id={c.$id}>{c.name}</Text>)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({});
