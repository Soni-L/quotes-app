import styles from "./page.module.css";
import ShowQuote from "@/components/ShowQuote";

const fetchQuotes = async () => {
  const res = await fetch("https://dummyjson.com/quotes");

  if (!res.ok) {
    throw new Error("Failed to fetch quote");
  }

  const { quotes } = await res.json();
  return quotes;
};

export default async function Home() {
  const quotes = await fetchQuotes();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ShowQuote quotes={quotes} />
      </main>
    </div>
  );
}
