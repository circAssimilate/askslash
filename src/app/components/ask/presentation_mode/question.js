import React from 'react';
import PropTypes from 'prop-types';

const questionsModule = require('app/modules/questions');

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="flex--1 flex flex--column presentation-mode-question-wrapper">
        <div dangerouslySetInnerHTML={{__html: questionsModule.fns.sanitizeQuestionAndConvertMarkdownToHtml(this.props.question) }}
             className="flex--dead-center flex--1 weight--light">
        </div>
        <div className="question-info anchor--middle weight--light">
          By <span className="highlight">{ this.props.author }</span> { questionsModule.fns.renderTimeSincePosted(this.props.date) }
        </div>
      </div>
    );
  }
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Question
