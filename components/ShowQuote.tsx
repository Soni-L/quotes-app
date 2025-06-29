"use client";
import { useState } from "react";
import { Quote } from "../types/allTypes";
import useOfflineCaching from "@/hooks/useOfflineCaching";

const ShowQuote = ({ quotes }: { quotes: Quote[] }) => {
  const { isOnline, cachedQuotes } = useOfflineCaching(quotes);
  const [selectedQuote, setSelectedQuote] = useState(
    cachedQuotes[Math.floor(Math.random() * cachedQuotes.length)]
  );

  const handleClick = async () => {
    setSelectedQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p>{selectedQuote?.quote}</p>
        <p>
          <strong>"{selectedQuote?.author}"</strong>
        </p>
      </div>
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
        Show me another quote!
      </button>
    </>
  );
};

export default ShowQuote;
