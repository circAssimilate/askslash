const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// main
router.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

// debug
router.get('/users/:userId/books/:bookId', function (request, response) {
  response.send(request.params)
});

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/askslash';

// get questions
router.get('/backend/questions', function(request, response) {
  const collectionName = 'questions';
  MongoClient.connect(url, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(collectionName);
    collection.find({}).toArray(function(err, result) {
      if (err) {
        return console.error('Unable to get collection', err);
      }
      console.log('Returned results for', collectionName);
      response.send({
        'questions': result,
      });
    });
    db.close();
  });
});

// post question
router.post('/backend/questions', function(request, response) {
  const collectionName = 'questions';
  MongoClient.connect(url, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(collectionName);

    const question = {
      question: request.body.question,
      author: request.body.author,
      author_id: request.body.author_id,
      question_id: request.body.question_id,
    };

    collection.insert(question, function(err, result) {
      if (err) {
        console.error('Unable to post to collection', err);
        return response.send(err);
      }
      console.log('Returned results for', collectionName);
      response.send({
        'insertedQuestions': result.ops,
      });
    });

    db.close();
  });
});

// // Example Ajax
// $.ajax({
//   url: '/backend/questions',
//   type: 'POST',
//   contentType: 'application/json',
//   data: JSON.stringify({
//     'question': 'Testing 123?',
//     'author': 'John Doe',
//     'author_id': 1239084095,
//     'question_id' : 83490309
//   }),
//   success: function(response){console.log(response);},
// });


// main
router.post('/backend/questions', function(request, response) {
  response.send(request.params)
});

module.exports = router;