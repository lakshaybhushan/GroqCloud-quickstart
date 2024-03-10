import Groq from "groq-sdk";
import * as readline from "node:readline";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const customInstructions = "You are a helpful assistant.";

async function main() {
  rl.question("Enter your message: ", async (input) => {
    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: customInstructions,
        },
        {
          role: "user",
          content: input,
        },
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
    });

    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }

    rl.close();
  });
}

main();