const fetchFromPimpAI = async (quote: string): Promise<string> => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "user",
            content: `Pimp the following quote in parentheses in the style of Snoop Dog (${quote}). Answer in output string only!`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    const errorMessage = error?.message || "Unknown network or parsing error";
    console.error("Network or parsing error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export default fetchFromPimpAI;
