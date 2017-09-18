const $ = require('jquery');
const enums = require('./enums');
const fns = require('./fns');

// // Database actions
// exports.getQuestions = meetingId => {
//   return $.ajax({
//     url: `/api/v1/questions/${meetingId}`,
//     type: 'GET',
//   });
// };
//
// exports.postQuestion = questionData => {
//   return $.ajax({
//     url: '/api/v1/questions',
//     type: 'POST',
//     contentType: 'application/json',
//     data: JSON.stringify(questionData),
//   });
// };
//
// exports.updateQuestion = path => {
//   return $.ajax({
//     url: `/api/v1/questions/${path}`,
//     type: 'PUT',
//     contentType: 'application/json',
//   });
// };

exports.getMeetings = () => {
  return $.ajax({
    url: '/api/v1/meetings',
    type: 'GET',
  });
};

exports.createMeeting = meetingData => {
  return $.ajax({
    url: '/api/v1/meetings',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(meetingData),
  });
};

exports.deleteMeeting = meetingId => {
  return $.ajax({
    url: `/api/v1/meetings/${meetingId}`,
    type: 'DELETE',
    contentType: 'application/json',
  });
};

// exports.archiveMeetingQuestions = path => {
//   return $.ajax({
//     url: `/api/v1/meetings/${path}`,
//     type: 'PUT',
//     contentType: 'application/json',
//   });
// };

// Client storage actions
exports.getOrCreateUserId = () => {
  const userId = localStorage.getItem('user_id') || localStorage.setItem('user_id', fns.uuidV4());
  return {userId: userId}
};

exports.setMeetingId = (meetingId, callback) => {
  localStorage.setItem('meeting_id', meetingId);
  callback();
};

exports.getMeetingId = () => {
  return localStorage.getItem('meeting_id');
};
