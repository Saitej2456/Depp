import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { env } from "./src/config/env.js";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

async function run() {
  const chat = ai.chats.create({
    model: "gemini-3.6-flash",
    config: {
      tools: [{
        functionDeclarations: [{
          name: "get_weather",
          description: "Get weather",
          parameters: {
            type: "OBJECT",
            properties: { location: { type: "STRING" } }
          }
        }]
      }]
    }
  });

  console.log("Sending initial message...");
  let res = await chat.sendMessage({ message: "What is the weather in Paris?" });
  console.log("Model calls:", JSON.stringify(res.functionCalls, null, 2));

  if (res.functionCalls) {
    const parts = res.functionCalls.map(c => ({
      functionResponse: {
        name: c.name,
        response: { temp: 20 }
      }
    }));
    
    console.log("Sending function response...");
    try {
      let finalRes = await chat.sendMessage({ message: parts });
      console.log("Success:", finalRes.text);
    } catch (e) {
      console.error("Failed:", e.message);
    }
  }
}

run();
