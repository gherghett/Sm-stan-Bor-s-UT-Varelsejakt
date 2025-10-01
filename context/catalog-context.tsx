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
  viskanIsRed: boolean;
  // newCreaturesCount: number;
  // markCatalogAsViewed: () => void;
  // hasNewCreatures: boolean;
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
  
  const viskanIsRed = !!catalog && !!catalog.find(c => c.$id == "68dbd470eeb126340e4c");
  
  // // "New" creatures tracking
  // const [lastViewedCatalogIds, setLastViewedCatalogIds] = useState<Set<string>>(new Set());
  // const [catalogViewedAt, setCatalogViewedAt] = useState<number | null>(null);

  // // Calculate new creatures count
  // const newCreaturesCount = catalog 
  //   ? catalog.filter(creature => !lastViewedCatalogIds.has(creature.$id)).length 
  //   : 0;
    
  // const hasNewCreatures = newCreaturesCount > 0;

  // // Mark catalog as viewed - resets new creatures counter
  // const markCatalogAsViewed = () => {
  //   if (catalog) {
  //     const currentIds = new Set(catalog.map(c => c.$id));
  //     setLastViewedCatalogIds(currentIds);
  //     setCatalogViewedAt(Date.now());
  //   }
  // };

  const loadCatalog = async (u: AppwriteUser) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUserCreatureCatalog(u);
      if (result.status === "success") {
        const newCatalog = result.result.creatures ?? [];
        const newClues = result.result.clues ?? [];
        
        setCatalog(newCatalog);
        setClues(newClues);
        
        // Initialize viewed state if this is the first load and we have no tracked IDs
        // if (lastViewedCatalogIds.size === 0 && newCatalog.length > 0) {
        //   // On first load, don't mark as new - assume user has seen existing creatures
        //   setLastViewedCatalogIds(new Set(newCatalog.map(c => c.$id)));
        // }
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
        viskanIsRed
        // newCreaturesCount,
        // markCatalogAsViewed,
        // hasNewCreatures,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export { CatalogProvider };
