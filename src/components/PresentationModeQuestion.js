const React = require('react');
const modules = require('../modules');

module.exports = React.createClass({
  propTypes: {
    questionCount: React.PropTypes.number.isRequired,
    currentQuestionIndex: React.PropTypes.number.isRequired,
    question: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
  },

  render() {
    return(
      <div data-ui-hook="presentation-mode-question-wrapper" className="flex--1 flex flex--column">
        <div className="navigation-info">
          Question { (this.props.currentQuestionIndex + 1) } of { this.props.questionCount }
        </div>
        <div className="flex--dead-center flex--1">
          <div dangerouslySetInnerHTML={{__html: this.props.question }}></div>
        </div>
        <div className="question-info">
          By <span className="highlight">{ this.props.author }</span> { modules.fns.renderTimeSincePosted(this.props.date) }
        </div>
      </div>
    );
  }
});
