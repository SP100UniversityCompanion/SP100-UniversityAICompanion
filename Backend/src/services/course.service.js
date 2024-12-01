// Importing necessary Firestore functions and the Firebase database instance
const {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
} = require("firebase/firestore");

const { db } = require("../config/firebase");

// CourseService class definition
class CourseService {
  constructor() {
    this.collectionName = "Courses";
  }

  // Method to create multiple courses from an array
  async createMultipleCourses(coursesData) {
    try {
      // Using a batch write for atomic transaction, if one fails, it aborts
      const batch = writeBatch(db);
      const collectionRef = collection(db, this.collectionName);

      // Iterate through each course in the array
      for (const course of coursesData) {
        // Create a new document reference within the "Courses" collection
        const docRef = doc(collectionRef, course.code);

        // Check if the document already exists
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          const savedData = {
            name: course.name,
            creditHours: course.creditHours,
            prerequisites: course.prerequisite,
          };

          // Only set the document if it doesn't exist
          batch.set(docRef, savedData);
        } else {
          console.log(`Course ${course.code} already exists, skipping.`);
        }
      }

      // Commit the batch to save all the documents
      await batch.commit();
      console.log("All courses created successfully");
    } catch (error) {
      console.error("Failed to create courses:", error);
      throw error;
    }
  }

  // Method to create a new course
  async createCourse(courseData) {
    try {
      // Creating a reference to the "Courses" collection
      const collectionRef = collection(db, "Courses");

      // Creating a new document reference within the "Courses" collection
      const docRef = doc(collectionRef, courseData.code);

      const savedData = {
        name: courseData.name,
        creditHours: courseData.creditHours,
        prerequisites: courseData.prerequisite,
      };

      // Setting the document with the provided course data
      await setDoc(docRef, savedData);
    } catch (error) {
      console.error("Failed to create course:", error);
      throw error;
    }
  }

  // Method to modify an existing course
  async modifyCourse(courseId, courseData) {
    try {
      // Creating a document reference for the course to be modified
      const docRef = doc(db, "Courses", courseId);

      // Updating the document with the provided course data
      await updateDoc(docRef, courseData);
    } catch (error) {
      console.error("Failed to modify course:", error);
      throw error;
    }
  }

  // Method to get all courses
  async getAllCourses() {
    try {
      const collectionRef = collection(db, this.collectionName);
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Failed to get all courses:", error);
      throw error;
    }
  }

  async getCourseById(courseId) {
    try {
      const docRef = doc(db, "Courses", courseId);
      const snapshot = await getDoc(docRef);
      return snapshot.data();
    } catch (error) {
      console.error("Failed to get course by ID:", error);
      throw error;
    }
  }

  // Method to delete a course
  async deleteCourse(courseId) {
    try {
      // Creating a document reference for the course to be deleted
      const docRef = doc(db, "Courses", courseId);

      // Deleting the document
      await deleteDoc(docRef);
      return { message: "Course deleted successfully" };
    } catch (error) {
      console.error("Failed to delete course:", error);
      throw error;
    }
  }
}

module.exports = new CourseService();
