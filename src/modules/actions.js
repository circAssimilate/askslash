const $ = require('jquery');
const enums = require('./enums');

exports.getQuestions = () => {
  return $.ajax({
    url: '/api/v1/questions',
    type: 'GET',
  });
};

exports.postQuestion = (data) => {
  // {
  //   'question': 'Testing 123?',
  //   'author': 'John Doe',
  // }

  return $.ajax({
    url: '/api/v1/questions',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
  });
};


// $.ajax({
//   url: '/api/v1/questions',
//   type: 'POST',
//   contentType: 'application/json',
//   data: JSON.stringify({
//     'question': 'Hi. Is this thing on? I was wondering if I could #help out. *italics*, **bold** <span>Testing span</span> https://google.com [Google.com](https://google.com)?',
//     'author': 'derek@optimizely.com',
//     'date' : 'Wed Mar 01 2017 23:25:57 GMT-0800 (PST)'
//   }),
//   success: function(response){console.log(response);},
// });