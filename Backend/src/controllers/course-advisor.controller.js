const courseAdvisorService = require("../services/course-advisor.service");

class CourseAdvisorController {
  async getCourseAdvice(req, res, next) {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({ error: "Question is required" });
      }

      const advice = await courseAdvisorService.answerQuestion(question);
      res.status(200).json(advice);
    } catch (error) {
      // Send an error response
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while adding category",
      });
    }
  }
}

module.exports = new CourseAdvisorController();
