const React = require('react');
const modules = require('../modules');

module.exports = React.createClass({
  propTypes: {
    author: React.PropTypes.string.isRequired,
    channel: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    question: React.PropTypes.string.isRequired,
  },

  render() {
    return(
      <li className="push--ends question">
        <div dangerouslySetInnerHTML={{__html: modules.fns.sanitizeQuestionAndConvertMarkdownToHtml(this.props.question) }}></div>
        <div className="question-info push-double--top">
          By <span className="highlight">{ this.props.author }</span> { modules.fns.renderTimeSincePosted(this.props.date) } via { this.props.channel }
        </div>
      </li>
    );
  }
});
