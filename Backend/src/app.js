require("dotenv").config();

// Upload requirements to Pinecone
// require("./scripts/uploadEmbeddings");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const courseRoutes = require("./routes/course.routes");
const userSessionRoutes = require("./routes/user-session.routes");
const courseAdvisorRoutes = require("./routes/course-advisor.routes");

// Middleware binding
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes binding
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/user-session", userSessionRoutes);
app.use("/api/course-advisor", courseAdvisorRoutes);

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
