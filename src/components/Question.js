const React = require('react');

module.exports = React.createClass({
  propTypes: {
    question: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
  },

  processQuestionText() {
    let questionText = this.props.question.replace(/(\#\S+)/g, '<span class="hashtag">$1</span>');
    return {__html: questionText};
  },

  renderTimeSincePosted() {
    // Epochs
    const epochs = [
        ['year', 31536000],
        ['month', 2592000],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
        ['second', 1]
    ];

    // Get duration
    const getDuration = (timeAgoInSeconds) => {
        for (let [name, seconds] of epochs) {
            const interval = Math.floor(timeAgoInSeconds / seconds);

            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: name
                };
            }
        }
    };

    // Calculate
    const timeAgo = (date) => {
        const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
        const {interval, epoch} = getDuration(timeAgoInSeconds);
        const suffix = interval === 1 ? '' : 's';

        return `${interval} ${epoch}${suffix} ago`;
    };

    return timeAgo(this.props.date);
  },

  render() {
    return(
      <li className="push--ends question"
          data-question-index={this.props.index} >
        <div dangerouslySetInnerHTML={ this.processQuestionText() }></div>
        <div className="question-info">
          By <span className="highlight">{ this.props.author }</span> { this.renderTimeSincePosted() }
        </div>
      </li>
    );
  }
});