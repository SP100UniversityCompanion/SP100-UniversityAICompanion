const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

router.post("/", courseController.createMultipleCourses);
router.get("/", courseController.getAllCourses);

module.exports = router;
