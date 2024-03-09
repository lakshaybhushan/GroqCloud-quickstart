import Groq from "groq-sdk"
import * as readline from "node:readline"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const customInstructions = `Your name is Alex, you are my personal assistant, your job is to answer my questions politely and accurately`

async function main() {
  rl.question("Enter your message: ", async (input) => {
    const completion = await groq.chat.completions
      .create({
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
      })
      .then((chatCompletion: any) => {
        process.stdout.write(chatCompletion.choices[0]?.message?.content || "")
        rl.close()
      })
      .catch((err) => {
        console.error(err)
        rl.close()
      })
  })
}

main()
