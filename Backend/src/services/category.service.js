const {
  collection,
  doc,
  query,
  where,
  getDoc,
  getDocs,
  writeBatch,
  documentId,
} = require("firebase/firestore");

const { db } = require("../config/firebase");

class CategoryService {
  constructor() {
    this.collection = "Categories";
  }

  // async addCategories(categories) {
  //   try {
  //     // Using a batch write for atomic transaction, if one fails, it aborts
  //     const batch = writeBatch(db);
  //     const categoriesCollection = collection(db, this.collection);

  //     // Iterate through each category in the array
  //     for (const category of categories) {
  //       // Create a new document reference within the "Categories" collection
  //       const docRef = doc(categoriesCollection, category.id);

  //       // Check if the document already exists
  //       const docSnap = await getDoc(docRef);

  //       if (!docSnap.exists()) {
  //         const savedData = {
  //           name: category.name,
  //           courses: category.prerequisite || [],
  //         };

  //         // Only set the document if it doesn't exist
  //         batch.set(docRef, savedData);
  //       } else {
  //         console.log(`Category ${category.id} already exists, skipping.`);
  //       }
  //     }

  //     // Commit the batch to save all the documents
  //     await batch.commit();
  //     console.log("All categories created successfully");
  //   } catch (error) {
  //     console.error("Failed to create categories:", error);
  //     throw error;
  //   }
  // }

  // Add courses to a category
  // categoryId: The id of the category to add the courses to
  // courses: An array of course ids to add to the category

  async createCategory(categoryName, courses) {
    try {
      // Using a batch write for atomic transaction, if one fails, it aborts
      const batch = writeBatch(db);
      const categoriesCollection = collection(db, this.collection);

      // Creating a reference to the specific document in the "Categories" collection
      const docRef = doc(categoriesCollection);

      // Getting the current courses in the category
      const docSnap = await getDoc(docRef);
      const currentCourses = docSnap.exists()
        ? docSnap.data().courses || []
        : [];
      const updatedCourses = [...new Set([...currentCourses, ...courses])];

      // Using set with merge option to update or create the document
      batch.set(
        docRef,
        { name: categoryName, courses: updatedCourses },
        { merge: true }
      );

      // Committing the batch to save the changes
      await batch.commit();
      console.log(`Courses added to category ${categoryName} successfully`);
    } catch (error) {
      console.error("Failed to add courses to category:", error);
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const collectionRef = collection(db, this.collection);
      const snapshot = await getDocs(collectionRef);

      const categories = await snapshot.docs.map((doc) => doc.data());

      const categoriesWithCourses = await Promise.all(
        categories.map(async (category) => {
          const coursesRef = collection(db, "Courses");
          const courseQuery = query(
            coursesRef,
            where(documentId(), "in", category.courses || [])
          );
          const courseSnapshot = await getDocs(courseQuery);
          const courses = courseSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { ...category, courses };
        })
      );

      return categoriesWithCourses;
    } catch (error) {
      console.error("Failed to get all categories:", error);
      throw error;
    }
  }
}

module.exports = new CategoryService();
