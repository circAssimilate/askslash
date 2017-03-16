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
      <div className="flex--1 flex flex--column presentation-mode-question-wrapper">
        <div dangerouslySetInnerHTML={{__html: modules.fns.sanitizeQuestionAndConvertMarkdownToHtml(this.props.question) }}
             className="flex--dead-center flex--1 weight--light">
        </div>
        <div className="question-info anchor--middle weight--light">
          By <span className="highlight">{ this.props.author }</span> { modules.fns.renderTimeSincePosted(this.props.date) }
        </div>
      </div>
    );
  }
});
