"use client";
import { useEffect, useState } from "react";
import { Quote } from "../types/allTypes";
import useOfflineCaching from "@/hooks/useOfflineCaching";
import PimpedButton from "./PimpedButton";
import usePimpedQuote from "@/hooks/usePimpedQuote";
import OfflineStatusIndicator from "./OfflineStatusIndicator";

const ShowQuote = ({ quotes }: { quotes: Quote[] }) => {
  const { cachedQuotes } = useOfflineCaching(quotes);
  const [selectedQuote, setSelectedQuote] = useState({
    quote: "",
    author: "",
    id: 0,
  } as Quote);
  const {
    pimpedQuote,
    disabled,
    getPimpedQuote,
    backToOriginal,
    loading,
    currentPimpMode,
  } = usePimpedQuote(selectedQuote);

  useEffect(() => {
    setSelectedQuote(
      cachedQuotes[Math.floor(Math.random() * cachedQuotes.length)]
    );
  }, []);

  const handleClick = async () => {
    setSelectedQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <>
      <OfflineStatusIndicator />
      {quotes.length > 0 && (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {currentPimpMode === "pimped" ? (
              <p
                style={{
                  fontFamily: "cursive",
                  fontSize: "19px",
                  color: "#BF00FF",
                  textShadow: "0 0 5px #BF00FF, 0 0 10px #8E44AD",
                }}
              >
                {pimpedQuote?.quote}
              </p>
            ) : (
              <p>{pimpedQuote?.quote}</p>
            )}
            <p>
              <strong>"{pimpedQuote?.author}"</strong>
            </p>
          </div>

          <div style={{ display: "flex", margin: "10px auto", gap: "20px" }}>
            <button
              onClick={handleClick}
              style={{
                cursor: "pointer",
                borderRadius: "8px",
                maxWidth: "200px",
                fontSize: "16px",
                padding: "10px",
              }}
            >
              Show me another quote!
            </button>
            <PimpedButton
              loading={loading}
              disabled={disabled}
              mode={currentPimpMode === "scholarly" ? "pimped" : "scholarly"}
              onClick={
                currentPimpMode === "scholarly"
                  ? getPimpedQuote
                  : backToOriginal
              }
            />
          </div>
        </>
      )}

      {quotes.length === 0 && (
        <>
          <p>Oops there has been an error, please reload the page!</p>
          <button
            onClick={handleClick}
            style={{
              cursor: "pointer",
              maxWidth: "200px",
              fontSize: "14px",
              padding: "8px",
              margin: "10px auto",
            }}
          >
            Reload!
          </button>
        </>
      )}
    </>
  );
};

export default ShowQuote;
