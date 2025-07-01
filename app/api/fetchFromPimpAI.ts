const fetchFromPimpAI = async (quote: string) => {
  //   const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer YOUR_OPENAI_API_KEY`,
  //     },
  //     body: JSON.stringify({
  //       model: "gpt-4",
  //       messages: [
  //         { role: "user", content: "Tell me a joke. Answer in input only" },
  //       ],
  //       temperature: 0.7,
  //     }),
  //   });

  //   const data = await response.json();
  //   console.log(data.choices[0].message.content);

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await timeout(1000);
  return "This is a placeholder for PimpAI's response.";
};

export default fetchFromPimpAI;
