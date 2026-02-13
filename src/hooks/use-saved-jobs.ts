import { useCallback, useEffect, useState } from "react";

const SAVED_KEY = "kodnest-saved-jobs";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  return { savedIds, toggleSave, isSaved };
}
