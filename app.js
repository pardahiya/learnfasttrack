const express = require("express");
const path = require("path");
const commonRoutes = require("./routes/common-routes");
const topicsApiRoutes = require("./routes/topics-api");
const articlesApiRoutes = require("./routes/articles-api");
const tutorialsApiRoutes = require("./routes/tutorials-api");

const app = express();
const port = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up the public folder for static files
app.use(express.static(path.join(__dirname, "public")));

// Use the index router for the main page
app.use("/", commonRoutes);
app.use("/api", topicsApiRoutes);
app.use("/api", articlesApiRoutes);
app.use("/api", tutorialsApiRoutes);

// Start the server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
