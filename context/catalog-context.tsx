import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getUserCreatureCatalog,
  Creature,
  AppwriteUser,
} from "../lib/appwrite";
import type { Result } from "../lib/result";
import { useUser } from "../hooks/use-users";
import { CreatureFoundwImage } from "../app/(tabs)/detektor";

interface CatalogContextValue {
  catalog: Creature[] | null;
  clues: Creature[] | null;
  loading: boolean;
  error: string | null;
  reloadCatalog: () => Promise<void>;
  currentEncounter: CreatureFoundwImage;
  setCurrentEncounter: Function;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(
  undefined
);

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return ctx;
}

interface CatalogProviderProps {
  children: ReactNode;
}

function CatalogProvider({ children }: CatalogProviderProps) {
  const { user, authChecked } = useUser();
  const [catalog, setCatalog] = useState<Creature[] | null>(null);
  const [clues, setClues] = useState<Creature[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEncounter, setCurrentEncounter] = useState<any>(null);

  const loadCatalog = async (u: AppwriteUser) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUserCreatureCatalog(u);
      if (result.status === "success") {
        setCatalog(result.result.creatures ?? []);
        setClues(result.result.clues ?? []);
      } else {
        setError("Failed to load catalog");
        setCatalog(null);
        setClues(null);
      }
    } catch (e: any) {
      setError(e?.message || "Unknown error");
      setCatalog(null);
        setClues(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authChecked && user) {
      loadCatalog(user);
    } else {
      setCatalog(null);
        setClues(null);

    }
  }, [authChecked, user]);

  return (
    <CatalogContext.Provider
      value={{
        catalog,
        clues, 
        loading,
        error,
        reloadCatalog: () => (user ? loadCatalog(user) : Promise.resolve()),
        currentEncounter,
        setCurrentEncounter,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

// ...existing code...

export { CatalogProvider };
