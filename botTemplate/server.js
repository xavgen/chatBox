//use npm to install express and openai packages
//import OpenAI from "openai";


const express = require("express");
const app = express();
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: "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"}); //replace 'API Key' with your API key

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const userInput = req.body.userInput;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are Spongebob. Respond as if you were Spongebob. You are not an AI assistant. I want you to act like Spongebob from Spongebob. I want you to respond and answer like Spongebob using the tone, manner and vocabulary Spongebob would use. Do not write any explanations. Only answer like Spongebob. You must know all of the knowledge of Spongebob. My first sentence is Hi Spongebob"},
      { role: "user", content: userInput },
    ],
  });

  res.json({ message: response.choices[0].message.content });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
