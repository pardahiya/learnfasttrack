const Datastore = require("nedb");
const path = require("path");

const categories = new Datastore({
   filename: path.join(__dirname, "db", "categories.db"),
   autoload: true,
});
const topics = new Datastore({
   filename: path.join(__dirname, "db", "topics.db"),
   autoload: true,
});
const articles = new Datastore({
   filename: path.join(__dirname, "db", "articles.db"),
   autoload: true,
});
const tutorials = new Datastore({
   filename: path.join(__dirname, "db", "tutorials.db"),
   autoload: true,
});
const tutorialArticles = new Datastore({
   filename: path.join(__dirname, "db", "tutorialArticles.db"),
   autoload: true,
});

module.exports = {
   categories,
   topics,
   articles,
   tutorials,
   tutorialArticles,
};
