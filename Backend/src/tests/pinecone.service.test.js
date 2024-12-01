// At the very top of the file
require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const pineconeService = require("../services/pinecone.service");

const testData = [
  {
    id: "vec1",
    text: "Apple is a popular fruit known for its sweetness and crisp texture.",
  },
  {
    id: "vec2",
    text: "The tech company Apple is known for its innovative products like the iPhone.",
  },
  { id: "vec3", text: "Many people enjoy eating apples as a healthy snack." },
  {
    id: "vec4",
    text: "Apple Inc. has revolutionized the tech industry with its sleek designs and user-friendly interfaces.",
  },
  {
    id: "vec5",
    text: "An apple a day keeps the doctor away, as the saying goes.",
  },
  {
    id: "vec6",
    text: "Apple Computer Company was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne as a partnership.",
  },
];

console.log(pineconeService);

async function testPineconeService() {
  try {
    // Test index creation
    // await pineconeService.createIndex();
    // console.log("Index created successfully !");

    // Test embeddings generation
    // const embeddings = await pineconeService.generateEmbeddings(
    //   testData.map((d) => d.text)
    // );
    // console.log("Embeddings generated successfully !");

    // // // Prepare vectors
    // const vectors = await pineconeService.prepareVectors(testData, embeddings);
    // console.log("Vectors prepared successfully !");
    // console.log(vectors);

    // // Test vector upsertion
    // await pineconeService.upsertVectors(vectors);
    // console.log("Vectors upserted successfully !");

    // Test vector query
    const queryText = "Apple fruit";
    const queryEmbedding = await pineconeService.generateEmbeddings([
      queryText,
    ]);

    console.log(queryEmbedding);
    const queryResults = await pineconeService.queryVectors(
      queryEmbedding[0].values,
      3
    );
    console.log("Query results:", queryResults);
  } catch (err) {
    console.error("Test failed: ", err);
  }
}

testPineconeService();
