const express = require("express");
const courseAdvisorController = require("../controllers/course-advisor.controller");
const router = express.Router();

router.post("/chat", courseAdvisorController.getCourseAdvice);

module.exports = router;
