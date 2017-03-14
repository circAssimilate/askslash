const $ = require('jquery');
const enums = require('./enums');
const fns = require('./fns');

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