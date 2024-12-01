const { db } = require("../config/firebase");
const {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  writeBatch,
} = require("firebase/firestore");

class UserSessionService {
  constructor() {
    this.collection = "UserSessions";
  }

  // Add a new session for the user
  async addSession(userId) {
    try {
      // Create a new session document in the "UserSessions" collection
      const sessionRef = doc(collection(db, this.collection));

      // This sesion will store the user's id and completed courses per category
      await setDoc(sessionRef, {
        userId,
        completedCourses: [], // This will store courses by category
        createdAt: new Date(),
      });

      return sessionRef.id;
    } catch (error) {
      console.error("Failed to add user session:", error);
      throw error;
    }
  }

  async addCompletedCoursesToSession(sessionId, courses) {
    try {
      const batch = writeBatch(db);

      // Retrieve the session associated to sessionId
      const sessionRef = doc(db, this.collection, sessionId);
      const sessionDoc = await getDoc(sessionRef);

      // If the session does not exist, throw an error
      if (!sessionDoc.exists()) {
        throw new Error("Session not found");
      }

      // Get the current completed courses and create a Set for efficient checking
      const currentCompletedCourses = sessionDoc.data().completedCourses || [];
      const completedCoursesSet = new Set(currentCompletedCourses);

      // Check all courses exist and prepare the update
      for (const courseId of courses) {
        const courseRef = doc(db, "Courses", courseId);
        const courseDoc = await getDoc(courseRef);

        if (!courseDoc.exists()) {
          throw new Error(`Course with ID ${courseId} does not exist`);
        }

        // Add the course ID to the Set if it's not already there
        completedCoursesSet.add(courseId);
      }

      // Convert the Set back to an array for storage
      const updatedCompletedCourses = Array.from(completedCoursesSet);

      // Update the session with the new completed courses
      batch.update(sessionRef, {
        completedCourses: updatedCompletedCourses,
      });

      // Commit the batch
      await batch.commit();
    } catch (error) {
      console.error("Failed to add completed courses to session:", error);
      throw error;
    }
  }

  // Get all the sessions for a user
  async getSessionsForUser(userId) {
    try {
      // Get the collection ref
      const collectionRef = collection(db, this.collection);

      // Get the user session
      const sessionsQuery = query(collectionRef, where("userId", "==", userId));

      // Get the query snapshot
      const querySnapshot = await getDocs(sessionsQuery);

      // Return the sessions
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Failed to get user sessions:", error);
      throw error;
    }
  }
}

module.exports = new UserSessionService();
