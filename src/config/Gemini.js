// node --version # Should be >= 18
// No extra package needed — uses plain fetch() against Groq's OpenAI-compatible API.
//
// Get a free API key (no billing/card required) at:
//   https://console.groq.com/keys
//
// Then in your .env file (project root, same level as package.json):
//   VITE_GROQ_API_KEY=your_key_here
// Restart the dev server after adding it.

const MODEL_NAME = "llama-3.3-70b-versatile"; // fast, capable, free-tier model on Groq
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

async function runChat(prompt) {
  if (!API_KEY) {
    throw new Error(
      "Missing Groq API key. Set VITE_GROQ_API_KEY in a .env file and restart the dev server."
    );
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 2048,
        top_p: 1,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Groq API error (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("No content returned from Groq API.");
    }

    console.log(text);
    return text;
  } catch (err) {
    console.error("Groq API error:", err);
    throw err;
  }
}

export default runChat;
