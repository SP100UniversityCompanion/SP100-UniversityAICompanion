const {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");
const { db } = require("../config/firebase");

/** */
class UserService {
  constructor() {
    this.collection = "Users";
  }

  // Create a new user document
  async createUser(userData) {
    // Get the collection reference
    const usersCollection = collection(db, this.collection);

    // Create a new document reference with an auto-generated ID
    const newUserRef = doc(usersCollection);

    // Add a timestamp to the user data
    const userDataWithTimestamp = {
      ...userData,
      createdAt: new Date().toISOString(),
    };

    // Set the user data
    await setDoc(newUserRef, userDataWithTimestamp);

    return { id: newUserRef.id, ...userDataWithTimestamp };
  }

  // Get user data by UID
  async getUserById(uid) {
    const userRef = doc(db, this.collection, uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error("User not found");
    }
  }

  // Update user data
  async updateUser(uid, updateData) {
    const userRef = doc(db, this.collection, uid);
    await updateDoc(userRef, updateData);
    return this.getUserById(uid);
  }

  // Delete user document
  async deleteUser(uid) {
    const userRef = doc(db, this.collection, uid);
    await deleteDoc(userRef);
  }
}

module.exports = new UserService();
