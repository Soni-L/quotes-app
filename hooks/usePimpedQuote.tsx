import { useEffect, useState } from "react";
import fetchPimpedQuote from "@/app/api/fetchFromPimpAI";
import { Quote } from "@/types/allTypes";

const usePimpedQuote = (quote: Quote) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pimpedQuoteState, setPimpedQuoteState] = useState<any>({
    originalQuote: quote,
    pimpedQuote: null,
    mode: "scholarly",
  });

  const getPimpedQuote = async () => {
    setLoading(true);

    if (pimpedQuoteState.pimpedQuote) {
      setPimpedQuoteState({
        ...pimpedQuoteState,
        mode: "pimped",
      });
    } else {
      try {
        const pimpedQuote = await fetchPimpedQuote(quote.quote);
        setPimpedQuoteState({
          originalQuote: { ...quote },
          pimpedQuote: { ...quote, quote: pimpedQuote },
          mode: "pimped",
        });
      } catch (error) {
        console.error("Failed to fetch pimped quote:", error);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    setPimpedQuoteState({
      originalQuote: quote,
      pimpedQuote: null,
      mode: "scholarly",
    });
  }, []);

  useEffect(() => {
    setPimpedQuoteState({
      originalQuote: { ...quote },
      pimpedQuote: null,
      mode: "scholarly",
    });
  }, [quote.id]);

  return {
    loading,
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
