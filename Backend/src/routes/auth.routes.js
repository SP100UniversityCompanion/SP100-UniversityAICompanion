const express = require("express");
const router = express.Router();

const firebaseAuthController = require("../controllers/firebase-auth.controller");
const {
  verifyFirebaseIdToken,
} = require("../middleware/firebase-auth.middleware");
const statusCodes = require("../constants/statusCodes");

router.post("/signup", firebaseAuthController.registerUser);
router.post("/login", firebaseAuthController.loginUser);
router.post("/logout", firebaseAuthController.logoutUser);
router.post("/reset-password", firebaseAuthController.resetPassword);
router.post("/resend-verification-email", firebaseAuthController.sendEmail);
router.post("/verify-id-token", verifyFirebaseIdToken, (req, res) => {
  res
    .status(statusCodes.OK)
    .json({ message: "Token verified", user: req.user });
});

module.exports = router;
