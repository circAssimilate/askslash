import React from 'react';
import PropTypes from 'prop-types';

import questionsModule from 'app/modules/questions';

import {
  ButtonRow,
  Button,
} from 'optimizely-oui';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.renderInfoRow = this.renderInfoRow.bind(this);
    this.renderInfoRowWithButtons = this.renderInfoRowWithButtons.bind(this);
  }

  renderInfoRow() {
    return(
      <div
        className="display--inline-block push--right"
        key="1">
        By <span className="highlight">{ this.props.question.author }</span> { questionsModule.fns.renderTimeSincePosted(this.props.question.date) } via { this.props.question.channel }
      </div>
    );
  }

  renderInfoRowWithButtons() {
    return(
      <ButtonRow
        leftGroup={[
          <div
            className="display--inline-block push--right"
            key="1">
            By <span className="highlight">{ this.props.question.author }</span> { questionsModule.fns.renderTimeSincePosted(this.props.question.date) } via { this.props.question.channel }
          </div>,
          <Button
            key="2"
            onClick={ () => {
              if (!this.props.question.archived) {
                this.props.archiveQuestion(this.props.question._id)
              } else {
                this.props.unarchiveQuestion(this.props.question._id)
              }
            }}
            style="danger-outline"
            width="default">
            { this.props.question.archived ? 'Unarchive' : 'Archive' }
          </Button>,
          <Button
            key="3"
            onClick={ () => { this.props.deleteQuestion(this.props.question._id) } }
            style="danger"
            width="default">
            Delete
          </Button>,
        ]}
       />
    );
  }

  render() {
    return(
      <li className={ this.props.question.archived ? "push--ends question faded" : "push--ends question"}>
        <div dangerouslySetInnerHTML={{__html: questionsModule.fns.sanitizeQuestionAndConvertMarkdownToHtml(this.props.question.question) }}></div>
        <div className="question-info push-double--top">
          { this.props.showButtons ? this.renderInfoRowWithButtons() : this.renderInfoRow() }
        </div>
      </li>
    );
  }
};

Question.propTypes = {
  archiveQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired,
  unarchiveQuestion: PropTypes.func.isRequired,
};

export default Question
