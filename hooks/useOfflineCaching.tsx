import { useLocalStorage } from "usehooks-ts";
import useNetworkStatus from "./useNetworkStatus";
import { useEffect, useState } from "react";
import fetchQuotes from "@/app/api/fetchQuotes";

const useOfflineCaching = (initialQuotes: any) => {
  const [cachedQuotes, setCachedQuotes] = useLocalStorage<any>(
    "quotes",
    initialQuotes
  );
  const { isOnline } = useNetworkStatus();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNewBatch = async () => {
    setLoading(true);
    try {
      const newQuotes = await fetchQuotes();
      setCachedQuotes(newQuotes);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(() => {
      fetchNewBatch();
    }, 60000);

    return () => clearInterval(interval);
  }, [isOnline]);

  return { isOnline, cachedQuotes };
};

export default useOfflineCaching;
