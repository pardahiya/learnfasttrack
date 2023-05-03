const Datastore = require('nedb');
const path = require('path');

const topics = new Datastore({ filename: path.join(__dirname,'db', 'topics.db'), autoload: true });
const tutorials = new Datastore({ filename: path.join(__dirname, 'db', 'tutorials.db'), autoload: true });

module.exports = {
  topics,
  tutorials,
};
