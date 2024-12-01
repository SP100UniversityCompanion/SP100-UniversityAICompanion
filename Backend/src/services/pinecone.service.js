const {
  pc,
  indexName,
  dimension,
  metric,
} = require("../config/pinecone.config");

class PineconeService {
  constructor() {
    this.index = pc.index(indexName);
  }

  // Create an index to identify the vector database
  async createIndex() {
    await pc.createIndex({
      name: indexName,
      dimension,
      metric,
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
  }

  async upsertVector(id, vector, metadata) {
    try {
      const upsertRequest = [
        {
          id: id,
          values: vector,
          metadata: metadata,
        },
      ];
      const upsertResponse = await this.index.upsert(upsertRequest);

      console.log(`Vector upserted successfully. ID: ${id}`);
      return upsertResponse;
    } catch (error) {
      console.error(`Error upserting vector:`, error);
      throw error;
    }
  }
}

module.exports = new PineconeService();
