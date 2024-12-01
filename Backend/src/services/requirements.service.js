const { getEmbedding } = require("./embedding.service");
const pineconeService = require("./pinecone.service");

class RequirementsService {
  constructor() {
    // pineconeService.createIndex();
  }
  // Upserts course requirements to Pinecone
  async upsertCourseRequirements(requirements) {
    // Iterate through each category
    for (const category of requirements) {
      const categoryName = category.name;

      // Upserts the category
      await this.upsertCategory(category);

      for (const course of category.courses) {
        await this.upsertCourse(course, categoryName);
      }
    }
    console.log("Course requirements uploaded to Pinecone successfully!");
  }

  // Upserts a category to Pinecone
  async upsertCategory(category) {
    const categoryText = `Category: ${category.name}, Description: ${category.description}`;

    const embedding = await getEmbedding(categoryText);

    const metadata = {
      id: category.name,
      name: category.name,
      description: category.description,
      type: "category",
    };

    await pineconeService.upsertVector(category.name, embedding, metadata);
  }

  // Upserts a single course to Pinecone
  async upsertCourse(course, categoryName) {
    // Formats course text for Pinecone
    const courseText = this.formatCourseText(course, categoryName);

    // Gets the vector embedding for the course
    const embedding = await getEmbedding(courseText);

    // Creates course metadata for Pinecone
    const metadata = this.createCourseMetadata(course, categoryName);

    await pineconeService.upsertVector(course.id, embedding, metadata);
  }

  // Formats course text for Pinecone
  formatCourseText(course, categoryName) {
    return (
      `Course ID: ${course.id}, Name: ${course.name}, ` +
      `Credit Hours: ${course.creditHours}, ` +
      `Prerequisites: ${course.prerequisites.join(", ")}, ` +
      `Category: ${categoryName}`
    );
  }

  // Creates course metadata for Pinecone
  createCourseMetadata(course, categoryName) {
    return {
      id: course.id,
      name: course.name,
      creditHours: course.creditHours,
      prerequisites: course.prerequisites,
      category: categoryName,
    };
  }
}

module.exports = new RequirementsService();
