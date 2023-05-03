const Datastore = require('nedb');
const path = require('path');

const topics = new Datastore({ filename: path.join(__dirname,'db', 'topics.db'), autoload: true });
const subtopics = new Datastore({ filename: path.join(__dirname,'db', 'subtopics.db'), autoload: true });
const articles = new Datastore({ filename: path.join(__dirname,'db', 'articles.db'), autoload: true });
const tutorials = new Datastore({ filename: path.join(__dirname, 'db', 'tutorials.db'), autoload: true });

module.exports = {
  topics,
  subtopics,
  articles,
  tutorials
};
