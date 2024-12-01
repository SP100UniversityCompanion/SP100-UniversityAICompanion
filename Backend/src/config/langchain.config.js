// Backend/src/config/langchain.config.js
const { OpenAI } = require("@langchain/openai");
const { ConversationChain } = require("langchain/chains");
const { BufferMemory } = require("langchain/memory");
const { StructuredOutputParser } = require("langchain/output_parsers");

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-4o",
});

const memory = new BufferMemory();

const chain = new ConversationChain({ llm, memory });

const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
  answer: "The answer to the user's question",
  sources: "The sources or references used to answer the question",
  confidence: "The confidence score of the answer",
});

const formatInstructions = outputParser.getFormatInstructions();

module.exports = { chain, outputParser, formatInstructions, llm };
