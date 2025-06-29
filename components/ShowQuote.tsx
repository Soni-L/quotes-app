"use client";
import { useState } from "react";
import { Quote } from "../types/allTypes";

const ShowQuote = ({ quotes }: { quotes: Quote[] }) => {
  const [selectedQuote, setSelectedQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  const handleClick = () => {
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
          padding: "5px",
        }}
      >
        Show me another quote!
      </button>
    </>
  );
};

export default ShowQuote;
