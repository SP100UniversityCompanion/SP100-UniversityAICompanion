const { initializeApp } = require("firebase/app");
const { getAuth, initializeAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
// Import other Firebase services as needed

const firebaseConfig = {
  // Your Firebase configuration object
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth first
const auth = getAuth(app);

// Initialize other services after Auth
const db = getFirestore(app);
// Initialize other Firebase services here

module.exports = { app, auth, db };
