# Student Advisor Chatbot Backend Roadmap

## 1. Setup and Infrastructure

- [ ] Initialize a new Node.js project
- [ ] Set up Express.js for the backend server
- [ ] Configure database (MongoDB or PostgreSQL)
- [ ] Set up authentication system (JWT or OAuth)

## 2. Data Models and Database Schema

- [ ] Design User model (including completed courses)
- [ ] Design Course model
- [ ] Set up Pinecone for storing program requirements
  - [ ] Create a Pinecone index for program requirements
  - [ ] Design a schema for program requirement vectors and metadata
- [ ] Implement database migrations

## 3. Web Scraping for Program Requirements

- [ ] Research and choose a web scraping library (e.g., Puppeteer or Cheerio)
- [ ] Implement a scraping service to extract program requirements from provided URLs
- [ ] Design a schema to store scraped program requirements
- [ ] Create an API endpoint to trigger scraping and update program requirements

## 4. Student Progression Tracking

- [ ] Implement API endpoints for updating completed courses
- [ ] Create a service to calculate student's current level based on completed courses
- [ ] Develop logic to determine the next milestone in the student's progression

## 5. Roadmap Generation

- [ ] Design an algorithm to generate personalized roadmaps based on:
  - Student's completed courses
  - Program requirements
  - Course prerequisites
- [ ] Implement the roadmap generation service
- [ ] Create API endpoints for requesting and retrieving generated roadmaps

## 6. LangChain Integration

- [ ] Set up LangChain in the project
- [ ] Implement conversation memory using BufferMemory
- [ ] Create structured output parser for advisor responses
- [ ] Develop prompt templates for different advising scenarios

## 7. Chatbot Core Functionality

- [ ] Implement the main advisor chatbot service
- [ ] Integrate student progression data into the chatbot context
- [ ] Incorporate generated roadmaps into chatbot responses
- [ ] Develop logic for handling different types of student queries

## 8. Advanced Features

- [ ] Implement document retrieval for course information using FaissStore
- [ ] Create custom tools for course search, degree requirements, and career paths
- [ ] Set up an agent executor with the custom tools
- [ ] Develop logic for the chatbot to use appropriate tools based on query type
