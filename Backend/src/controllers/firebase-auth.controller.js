const { auth } = require("../config/firebase");
const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} = require("firebase/auth");

const statusCodes = require("../constants/statusCodes");
const userService = require("../services/user.service");

/**
 * This is the controller used to work with the firebase collection
 */
class FirebaseAuthController {
  /**Prudential Financial
   * Register a new user
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async registerUser(req, res) {
    // Get the request body
    const { email, password, name, schoolEmail, birthDate, academicSemester } =
      req.body;

    // Validate required fields
    if (
      !email ||
      !password ||
      !name ||
      !schoolEmail ||
      !birthDate ||
      !academicSemester
    ) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({
        error: "All fields are required",
      });
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send verification email
      await sendEmailVerification(userCredential.user);

      // Store additional user informations
      userService.createUser({
        id: userCredential.user.uid,
        name,
        schoolEmail,
        birthDate,
        academicSemester,
      });

      res.status(statusCodes.CREATED).json({
        message: "User created successfully and verification email sent!",
      });
    } catch (error) {
      // Error Handling
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message || "An error occurred while registering user",
        code: error.code || "unknown_error",
      });
    }
  }

  /**
   * Logs in a user with Firebase Authentication.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async loginUser(req, res) {
    const { email, password } = req.body;

    // If the email or password are not valid
    if (!email || !password) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      // Only send necessary user information
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        emailVerified: userCredential.user.emailVerified,
      };

      // Send back the response to the user
      res.status(statusCodes.OK).json({
        message: "User logged in successfully",
        idToken: idToken,
        user: userInfo,
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while logging in";
      res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  /**
   * Log out the user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */ async logoutUser(req, res) {
    try {
      console.log("Logging out user");
      await signOut(auth);
      res
        .status(statusCodes.OK)
        .json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }

  /**
   * Resets the password for a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns void
   */
  resetPassword(req, res) {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(res.UNPROCESSABLE_ENTITY).json({
        email: "Email is required",
      });
    }

    // Send password reset email
    this.sendPasswordResetEmail(email);
  }

  /**
   * Sends a verification email to the current user.
   * @returns {Promise<void>}
   */
  async sendEmail() {
    try {
      // Send the verification email
      await sendEmailVerification(auth.currentUser);
      res.status(statusCodes.CREATED).json({
        message: "Verification email sent! User created successfully!",
      });
    } catch (emailError) {
      // Error handling
      console.error("Error sending verification email:", emailError);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to send verification email",
        error: "Error sending verification email",
        code: emailError.code,
      });
    }
  }

  /**
   * Sends a password reset email to the specified email address.
   * @param {string} email - The email address of the user requesting a password reset.
   * @returns {Promise<Object>} An object containing the status and message/error.
   */
  async sendPasswordResetEmail(email) {
    try {
      // Send password reset email using Firebase Auth
      await sendPasswordResetEmail(auth, email);

      // Return success response
      return {
        status: statusCodes.OK,
        message: "Password reset email sent successfully!",
      };
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error sending password reset email:", error);

      // Return error response
      return {
        status: statusCodes.INTERNAL_SERVER_ERROR,
        error: "Failed to send password reset email",
      };
    }
  }

  async verifyIdToken(req, res) {
    const idToken = req.body.idToken;
    const decodedToken = await auth.verifyIdToken(idToken);
    res.status(statusCodes.OK).json({ decodedToken });
  }
}

module.exports = new FirebaseAuthController();
