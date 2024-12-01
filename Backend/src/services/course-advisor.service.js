const { PineconeStore } = require("@langchain/pinecone");
const { OpenAIEmbeddings } = require("@langchain/openai");
const {
  createStuffDocumentsChain,
} = require("langchain/chains/combine_documents");
const { createRetrievalChain } = require("langchain/chains/retrieval");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const pineconeService = require("./pinecone.service");

const {
  generalInquiryTemplate,
  prerequisiteCheckTemplate,
  graduationRequirementsTemplate,
} = require("../config/prompt-templates");

const {
  chain,
  outputParser,
  formatInstructions,
  llm,
} = require("../config/langchain.config");

class CourseAdvisor {
  constructor() {
    this.vectorStore = null;
    this.chain = chain;
    this.retrievalChain = null;
    this.embeddings = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) {
      console.log("CourseAdvisor already initialized.");
      return;
    }

    console.log("Initializing PineconeService...");
    const pineconeIndex = pineconeService.index;
    console.log("PineconeService initialized.");

    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    console.log("Embeddings initialized.");

    this.vectorStore = await PineconeStore.fromExistingIndex(this.embeddings, {
      pineconeIndex,
    });

    console.log(this.vectorStore);

    console.log("VectorStore initialized.");

    const prompt = ChatPromptTemplate.fromTemplate(
      "Answer the following question based on the given context: {context}\n\nQuestion: {question}"
    );
    console.log("PromptTemplate created.");

    const combineDocsChain = createStuffDocumentsChain({
      llm,
      prompt,
    });
    console.log("CombineDocsChain created.");

    const retriever = this.vectorStore.asRetriever();
    console.log("Retriever created.");

    this.retrievalChain = await createRetrievalChain({
      combineDocsChain: combineDocsChain,
      retriever: this.vectorStore.asRetriever({
        searchKwargs: { k: 10 },
        searchType: "similarity",
      }),
      inputKey: "question", // Ensure the input key matches the expected key
      returnSourceDocuments: true, // Optional, based on your requirements
    });
    console.log("RetrievalChain created.");

    this.initialized = true;
    console.log("CourseAdvisor initialized successfully.");
  }

  async answerQuestion(question, type = "general", additionalInfo = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    console.log("Invoking retrievalChain...");

    const vectorResponse = await this.retrievalChain.invoke({
      input: question,
    });

    console.log(
      "RetrievalChain raw response:",
      JSON.stringify(vectorResponse, null, 2)
    );

    let prompt;
    let input;

    switch (type) {
      case "prerequisite":
        prompt = prerequisiteCheckTemplate;
        input = await prompt.format({
          course: question,
          completed_courses: additionalInfo.completedCourses || "",
          context: vectorResponse.answer,
          format_instructions: formatInstructions,
        });
        break;
      case "graduation":
        prompt = graduationRequirementsTemplate;
        input = await prompt.format({
          program: additionalInfo.program || "",
          completed_courses: additionalInfo.completedCourses || "",
          context: vectorResponse.answer,
          format_instructions: formatInstructions,
        });
        break;
      case "general":
      default:
        prompt = generalInquiryTemplate;
        input = await prompt.format({
          question: question,
          context: vectorResponse.context,
          format_instructions: formatInstructions,
        });
    }

    console.log("Calling ConversationChain...");

    const response = await this.chain.call({ input });
    console.log("ConversationChain response:", response);

    return { answer: response.response };

    // const parsedResponse = await outputParser.parse(response.response);
    // console.log("Parsed response:", parsedResponse);

    // return parsedResponse;
  }

  async getConversationHistory() {
    await this.initialize();
    const history = await this.chain.memory.loadMemoryVariables({});
    return history.history || "No conversation history available.";
  }
}

module.exports = new CourseAdvisor();
