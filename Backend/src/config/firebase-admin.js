const admin = require("firebase-admin");

const serviceAccount = require("../firebaseadmin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  adminAuth: admin.auth(),
  adminFirestore: admin.firestore(),
};
