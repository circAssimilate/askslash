const bodyParser = require('body-parser');
const express = require('express');
const modules = require('./src/modules');
const path = require('path');
const router = express.Router();

const {
  MongoClient,
  ObjectId,
} = require('mongodb');

const randomShortId = () => {
  return 'xxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toLowerCase();
};

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.use('/images/', express.static(path.join(__dirname, '/src/assets/static/img/')));

// main
router.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

/* QUESTIONS */

// get questions
router.get('/api/v1/questions/:meetingId', function(request, response) {
  const meetingId = request.params.meetingId;
  const questionQuery = meetingId ? { meeting_id: meetingId, deleted: false } : { deleted: false };

  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);
    collection.find(questionQuery).toArray(function(err, result) {
      if (err) {
        return console.error('Unable to get collection', err);
      }
      response.send({
        'questions': result,
      });
    });
    db.close();
  });
});

// create question
router.post('/api/v1/questions', function(request, response) {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);

    const question = {
      author: request.body.author,
      channel: request.body.channel,
      date: request.body.date,
      meeting_id: request.body.meeting_id,
      question: request.body.question,
      archived: false,
      deleted: false,
    };

    collection.insert(question, function(err, result) {
      if (err) {
        console.error('Unable to post to collection', err);
        return response.send(err);
      }
      response.send(result.ops[0]);
    });

    db.close();
  });
});

// update questions
router.put('/api/v1/questions/:questionId/:instruction', function(request, response) {
  const instruction = request.params.instruction;
  const questionId = request.params.questionId;
  let update = {};

  switch(instruction) {
    case 'archive':
      update = { archived: true };
      break;
    case 'unarchive':
      update = { archived: false };
      break;
    case 'delete':
      update = { deleted: true };
      break;
    case 'undelete':
      update = { deleted: false };
      break;
  }

  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.QUESTIONS);
    collection.update({ _id: ObjectId(questionId) }, { $set: update });

    response.send({status: 'success'});

    db.close();
  });
});

/* MEETINGS */

// get meeting
router.get('/api/v1/meetings', function(request, response) {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.MEETINGS);
    collection.find({}).toArray(function(err, result) {
      if (err) {
        return console.error('Unable to get collection', err);
      }
      response.send({
        'meetings': result,
      });
    });
    db.close();
  });
});

// create meeting
router.post('/api/v1/meetings', function(request, response) {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }
    const collection = db.collection(modules.enums.collections.MEETINGS);

    const meeting = {
      creator: request.body.creator,
      name: request.body.name,
      date: request.body.date,
      short_id: request.body.short_id,
    };

    let counter = 0;
    while(!meeting.short_id && counter < 10000) {
      counter = counter + 1;
      const shortId = randomShortId();
      const itemLookup = collection.find({short_id: shortId}, {_id: 1}).toArray((err, result) => {
        if(err) {
          return console.log('There was an error', err);
        }
        return result[0];
      });
      if (!itemLookup) {
        meeting.short_id = shortId;
      }
    }

    collection.insert(meeting, function(err, result) {
      if (err) {
        console.error('Unable to post to collection', err);
        return response.send(err);
      }
      response.send(result.ops[0]);
    });

    db.close();
  });
});

// create meeting
router.delete('/api/v1/meetings/:meetingId', function(request, response) {
  MongoClient.connect(modules.enums.settings.MONGO_URL.DEV, function(err, db) {
    if (err) {
      return console.error('Unable to connect to the server', err);
    }

    const collection = db.collection(modules.enums.collections.MEETINGS);
    const meetingId = request.params.meetingId;

    collection.deleteOne({ _id: ObjectId(meetingId) }, function(err, result) {
      if (err) {
        console.error('Unable to delete meeting', err);
        return response.send(err);
      }
      response.send({status: 'success'});
    });

    db.close();

  });
});

module.exports = router;