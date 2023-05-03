const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const topicsRoutes = require('./routes/topics');
const tutorialsRoutes = require('./routes/tutorials');

const app = express();
const port = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up the public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the index router for the main page
app.use('/', indexRouter);
app.use('/api', topicsRoutes);
app.use('/api', tutorialsRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});