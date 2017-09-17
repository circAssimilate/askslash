const enums = require('./enums');
const sanitizer = require('sanitizer');
const markdown = require( "markdown" ).markdown;

exports.sanitizeQuestionAndConvertMarkdownToHtml = (string) => {
  let findHastags = string.replace(/((^|\s)(#[0-9a-zA-Z]+)($|\s))/g, '$2[**$3**]($3)$4');
  let sanitizedHtml = sanitizer.sanitize(findHastags);
  let htmlFromMarkdown = markdown.toHTML(sanitizedHtml);

  return htmlFromMarkdown;
};

exports.renderTimeSincePosted = (dateCreated) => {
  // Units of time
  const unitsOfTime = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];

  // Get duration
  const getDuration = (timeAgoInSeconds) => {
    for (let [name, seconds] of unitsOfTime) {
      const interval = Math.floor(timeAgoInSeconds / seconds);
      if (interval >= 1) {
        return {
          interval: interval,
          epoch: name
        };
      }
    }
    return {
      interval: null,
      epoch: null
    };
  };

  // Calculate
  const timeAgo = (date) => {
    const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
    const {interval, epoch} = getDuration(timeAgoInSeconds);

    if (!interval) {
      return 'just now';
    }

    const suffix = interval === 1 ? '' : 's';

    return `${interval} ${epoch}${suffix} ago`;
  };

  return timeAgo(dateCreated);
};

exports.uuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toLowerCase();
};

exports.shortId = () => {
  return 'xxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toLowerCase();
};