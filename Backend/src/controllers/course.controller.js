const courseService = require("../services/course.service");

class CourseController {
  constructor() {
    this.collection = "Courses";
  }

  async getAllCourses(req, res) {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get all courses", error: error });
    }
  }
  async createCourse(req, res) {
    // Attempting to create a new course with the provided data
    try {
      const courseData = req.body; // Extracting course data from the request body
      await courseService.createCourse(courseData);

      // Sending a success response
      res.status(201).json({ message: "Course created successfully" });
    } catch (error) {
      // Handling any errors that occur during the course creation process
      res
        .status(500)
        .json({ message: "Failed to create course", error: error }); // Sending an error response
    }
  }

  async createMultipleCourses(req, res) {
    try {
      const coursesData = req.body; // Extracting courses data from the request body
      await courseService.createMultipleCourses(coursesData);

      // Sending a success response
      res.status(201).json({ message: "Courses created successfully" });
    } catch (error) {
      // Handling any errors that occur during the courses creation process
      res
        .status(500)
        .json({ message: "Failed to create courses", error: error }); // Sending an error response
    }
  }
}

module.exports = new CourseController();
