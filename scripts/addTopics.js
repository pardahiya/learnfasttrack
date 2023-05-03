const { topics } = require('../data/db');

const mainTopics = [
  {
    name: 'Web Development',
    subtopics: [
      { name: 'HTML', description: 'Learn the basics of HTML' },
      { name: 'CSS', description: 'Learn the basics of CSS' },
      { name: 'JavaScript', description: 'Learn the basics of JavaScript' },
      { name: 'React', description: 'Learn the basics of React' },
      { name: 'Node.js', description: 'Learn the basics of Node.js' },
    ],
  },
  {
    name: 'Programming Languages',
    subtopics: [
      { name: 'Python', description: 'Learn the basics of Python' },
      { name: 'Java', description: 'Learn the basics of Java' },
      { name: 'C++', description: 'Learn the basics of C++' },
      { name: 'C#', description: 'Learn the basics of C#' },
      { name: 'Ruby', description: 'Learn the basics of Ruby' },
    ],
  },
  {
    name: 'Software Architecture',
    subtopics: [
      { name: 'Microservices', description: 'Learn the basics of Microservices' },
      { name: 'Monolithic', description: 'Learn the basics of Monolithic Architecture' },
      { name: 'Serverless', description: 'Learn the basics of Serverless Architecture' },
      { name: 'Event-Driven', description: 'Learn the basics of Event-Driven Architecture' },
    ],
  },
  {
    name: 'Software Design',
    subtopics: [
      { name: 'Design Patterns', description: 'Learn about Design Patterns' },
      { name: 'SOLID Principles', description: 'Learn about SOLID Principles' },
      { name: 'Clean Code', description: 'Learn about Clean Code practices' },
      { name: 'Refactoring', description: 'Learn about Refactoring techniques' },
    ],
  },
];

topics.remove({}, { multi: true }, (err, numRemoved) => {
  if (err) {
    console.log('Error removing existing topics:', err);
  } else {
    console.log(`Removed ${numRemoved} existing topics`);
    topics.insert(mainTopics, (err, docs) => {
      if (err) {
        console.log('Error inserting new topics:', err);
      } else {
        console.log(`Inserted ${docs.length} new topics`);
      }
    });
  }
});