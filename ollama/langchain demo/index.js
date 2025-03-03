import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "smollm:latest", // default value: "llama3"
});

const result = await model.invoke(["human", "Hello, how are you?"]);
console.log(result);
