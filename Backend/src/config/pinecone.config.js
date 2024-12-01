require("dotenv").config();

const { Pinecone } = require("@pinecone-database/pinecone");

// Initialize Pinecone Client
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = "ai-companion-index";

module.exports = {
  pc,
  indexName,
  dimension: 1536,
  metric: "cosine",
  model: "multilingual-e5-large",
};
