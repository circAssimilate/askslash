const $ = require('jquery');
const enums = require('./enums');
const fns = require('./fns');

exports.getQuestions = (meeting = {}) => {
  let url = meeting._id ? `/api/v1/questions/${meeting._id}` : '/api/v1/questions';
  return $.ajax({
    url: url,
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

exports.updateQuestion = (path) => {
  let url = `/api/v1/questions/${path}`;
  return $.ajax({
    url: url,
    type: 'PUT',
    contentType: 'application/json',
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

exports.deleteMeeting = (meetingId) => {
  return $.ajax({
    url: `/api/v1/meetings/${meetingId}`,
    type: 'DELETE',
    contentType: 'application/json',
  });
};

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