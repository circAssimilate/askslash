const React = require('react');
const modules = require('../modules');

module.exports = React.createClass({
  propTypes: {
    question: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
  },

  render() {
    return(
      <div data-ui-hook="presentation-mode-question-wrapper" className="flex--1 flex flex--column">
        <div dangerouslySetInnerHTML={{__html: modules.fns.sanitizeQuestionAndConvertMarkdownToHtml(this.props.question) }}
             className="flex--dead-center flex--1">
        </div>
        <div className="question-info">
          By <span className="highlight">{ this.props.author }</span> { modules.fns.renderTimeSincePosted(this.props.date) }
        </div>
      </div>
    );
  }
});
