import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserCreatureCatalog, Creature, AppwriteUser } from "../lib/appwrite";
import type { Result } from "../lib/result";

interface CatalogContextValue {
  catalog: Creature[] | null;
  loading: boolean;
  error: string | null;
  reloadCatalog: (user: AppwriteUser) => Promise<void>;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return ctx;
}

interface CatalogProviderProps {
  user: AppwriteUser | null;
  children: ReactNode;
}

export const CatalogProvider: React.FC<CatalogProviderProps> = ({ user, children }) => {
  const [catalog, setCatalog] = useState<Creature[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCatalog = async (u: AppwriteUser) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUserCreatureCatalog(u);
      if (result.status === "success") {
        setCatalog(result.result ?? []);
      } else {
        setError("Failed to load catalog");
        setCatalog(null);
      }
    } catch (e: any) {
      setError(e?.message || "Unknown error");
      setCatalog(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadCatalog(user);
    } else {
      setCatalog(null);
    }
  }, [user]);

  return (
    <CatalogContext.Provider value={{ catalog, loading, error, reloadCatalog: loadCatalog }}>
      {children}
    </CatalogContext.Provider>
  );
};
