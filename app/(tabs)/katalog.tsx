import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Creature, getUserCreatureCatalog } from "../../lib/appwrite";
import { useUser } from "../../hooks/use-users";
import type { Result } from "../../lib/result";
import { useCatalog } from "../../context/catalog-context";

export default function katalog() {
  const { catalog, loading, error } = useCatalog();

  return (
    <View>
      {loading && <Text>Loading....</Text>}
      {error && <Text>Error: {error}</Text>}
      {catalog && catalog.length === 0 && <Text>No creatures found.</Text>}
      {catalog && catalog.length > 0 && (
        <View>
          {catalog.map((c) => (
            <Text key={c.$id}>{c.name}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
