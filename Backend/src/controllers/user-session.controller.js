const userSessionService = require("../services/user-session.service.js");

class UserSessionController {
  constructor() {}

  async addSession(req, res) {
    try {
      const userId = req.body.userId;
      const sessionId = await userSessionService.addSession(userId);
      res.status(201).json({ sessionId });
    } catch (error) {
      console.error("Failed to add user session:", error);
      res.status(500).json({ message: "Failed to add user session" });
    }
  }

  async addCompletedCourses(req, res) {
    try {
      const userId = req.body.userId;
      const courses = req.body.courses;

      const sessionId = await userSessionService.addSession(userId);
      await userSessionService.addCompletedCoursesToSession(sessionId, courses);
      res.status(200).json({ message: "Courses added to session" });
    } catch (error) {
      console.error("Failed to add completed courses to session:", error);
      res
        .status(500)
        .json({ message: "Failed to add completed courses to session" });
    }
  }

  async getSessionsForUser(req, res) {
    try {
      const userId = req.params.userId;
      const sessions = await userSessionService.getSessionsForUser(userId);
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Failed to get user sessions:", error);
      res.status(500).json({ message: "Failed to get user sessions" });
    }
  }
}
module.exports = new UserSessionController();
