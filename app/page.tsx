import fetchQuotes from "@/api/fetchQuotes";
import styles from "./page.module.css";
import ShowQuote from "@/components/ShowQuote";

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
