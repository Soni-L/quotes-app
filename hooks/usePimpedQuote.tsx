import { useEffect, useState } from "react";
import fetchPimpedQuote from "@/app/api/fetchFromPimpAI";
import { Quote, WritingMode } from "@/types/allTypes";
import useNetworkStatus from "./useNetworkStatus";

type PimpedQuoteState = {
  error: string | null;
  originalQuote: Quote;
  pimpedQuote: Quote | null;
  mode: WritingMode;
};

const usePimpedQuote = (quote: Quote) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOnline } = useNetworkStatus();
  const [pimpedQuoteState, setPimpedQuoteState] = useState<PimpedQuoteState>({
    error: null,
    originalQuote: quote,
    pimpedQuote: null,
    mode: "scholarly",
  });

  const getPimpedQuote = async () => {
    setLoading(true);

    if (pimpedQuoteState.pimpedQuote) {
      setPimpedQuoteState({
        ...pimpedQuoteState,
        error: null,
        mode: "pimped",
      });
    } else {
      try {
        const pimpedQuote = await fetchPimpedQuote(quote.quote);
        setPimpedQuoteState({
          error: null,
          originalQuote: { ...quote },
          pimpedQuote: { ...quote, quote: pimpedQuote },
          mode: "pimped",
        });
      } catch (error : any) {
        console.error("Failed to fetch pimped quote:", error);
        setPimpedQuoteState({
          ...pimpedQuoteState,
          error: "" + error,
        });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    setPimpedQuoteState({
      error: null,
      originalQuote: quote,
      pimpedQuote: null,
      mode: "scholarly",
    });
  }, []);

  useEffect(() => {
    setPimpedQuoteState({
      error: null,
      originalQuote: { ...quote },
      pimpedQuote: null,
      mode: "scholarly",
    });
  }, [quote.id]);

  return {
    loading,
    error: pimpedQuoteState.error,
    disabled:
      !isOnline &&
      pimpedQuoteState.mode === "scholarly" &&
      !pimpedQuoteState.pimpedQuote,
    currentPimpMode: pimpedQuoteState.mode,
    pimpedQuote:
      pimpedQuoteState.mode === "scholarly"
        ? pimpedQuoteState.originalQuote
        : pimpedQuoteState.pimpedQuote,
    getPimpedQuote,
    backToOriginal: () => {
      setPimpedQuoteState({
        ...pimpedQuoteState,
        mode: "scholarly",
      });
    },
  };
};

export default usePimpedQuote;
