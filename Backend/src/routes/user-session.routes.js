const express = require("express");
const router = express.Router();
const userSessionController = require("../controllers/user-session.controller");

router.post("/completed-courses", userSessionController.addCompletedCourses);
router.get("/user/:userId", userSessionController.getSessionsForUser);

module.exports = router;
