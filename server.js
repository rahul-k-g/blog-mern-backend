// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const register = require("./routes/register");
const login = require("./routes/login");
const createBlog = require("./routes/createBlog");
const fetchBlogs = require("./routes/fetchBlogs");
const blogOperations = require("./routes/blogOperations");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: "https://blog-mern-frontend.onrender.com/",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection has been established!");
});

// Router
app.use("/api/v1/register", register);
app.use("/api/v1/login", login);
app.use("/api/v1/blogs", createBlog);
app.use("/api/v1/fetchBlogs", fetchBlogs);
app.use("/api/v1/blogOperations", blogOperations);
// Serve static files in production
// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "frontend", "build");
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, "index.html"));
  });
}


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
