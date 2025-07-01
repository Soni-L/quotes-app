import { Quote } from "@/types/allTypes";

const fetchQuotes = async (): Promise<Quote[]> => {
  const urls = [
    "https://zenquotes.io/api/quotes",
    "https://dummyjson.com/quotes?limit=50",
  ];

  const requests = urls.map((url) =>
    fetch(url, { next: { revalidate: 30 } }).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch from ${url}: ${res.status}`);
      }
      return res.json().then((data) => ({ url, data }));
    })
  );

  try {
    const { url, data } = await Promise.any(requests);
    if (url === "https://dummyjson.com/quotes?limit=50") {
      console.log("DummyJSON won the race!");
      return data.quotes;
    }

    if (url === "https://zenquotes.io/api/quotes") {
      console.log("Zenquotes won the race!");
      return data.map((item: { q: string; a: string; c: string }) => ({
        id: Number(item.c),
        quote: item.q,
        author: item.a,
      }));
    }

    return [];
  } catch (error) {
    console.error("All requests failed:", error);
    return [];
  }
};

export default fetchQuotes;
