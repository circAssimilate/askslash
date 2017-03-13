const $ = require('jquery');
const enums = require('./enums');

exports.getQuestions = () => {
  return $.ajax({
    url: '/api/v1/questions',
    type: 'GET',
  });
};

exports.postQuestion = (data) => {
  return $.ajax({
    url: '/api/v1/questions',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
  });
};

exports.getMeetings = () => {
  return $.ajax({
    url: '/api/v1/meetings',
    type: 'GET',
  });
};

exports.createMeeting = (data) => {
  return $.ajax({
    url: '/api/v1/meetings',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
  });
};
