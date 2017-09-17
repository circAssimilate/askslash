import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import questionsModule from 'app/modules/questions';

import Question from './question';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.archiveQuestion = this.archiveQuestion.bind(this);
    this.unarchiveQuestion = this.unarchiveQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.renderNoQuestions = this.renderNoQuestions.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderQuestions = this.onSubmit.bind(this);
    this.renderQuestionsView = this.onSubmit.bind(this);

    this.state = {
      questions: [],
    };
  }

  archiveQuestion(questionId) {
    const path = `${questionId}/archive`;
    questionsModule.actions.updateQuestion(path)
      .done(response => {
        this.props.refreshAppData();
      });
  }

  unarchiveQuestion(questionId) {
    const path = `${questionId}/unarchive`;
    questionsModule.actions.updateQuestion(path)
      .done(response => {
        this.props.refreshAppData();
      });
  }

  deleteQuestion(questionId) {
    const path = `${questionId}/delete`;
    questionsModule.actions.updateQuestion(path)
      .done(response => {
        this.props.refreshAppData();
      });
  }

  renderNoQuestions() {
    return(
      <section className="soft-double">
        <div className="text--center">
          There are currently no questions for this meeting.
        </div>
      </section>
    );
  }

  renderLoading() {
    return(
      <section className="anchor--middle soft-double--sides soft--ends">
        <div className="position--relative height--100">
          <div className="overlay">
            <div className="spinner spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  renderQuestions() {
    return(
      <section className="anchor--middle soft-double--sides soft--ends">
        <ol>
          { this.props.questions.map(question => {
            if (!question.archived || this.props.showArchived) {
              return (
                <Question
                  question={ question }
                  archiveQuestion={ this.archiveQuestion }
                  deleteQuestion={ this.deleteQuestion }
                  showButtons={ this.props.showButtons }
                  unarchiveQuestion={ this.unarchiveQuestion }
                  key= { question._id } />
              );
            }
          })}
        </ol>
      </section>
    );
  }

  render() {
    if (this.props.isLoading) {
      return this.renderLoading();
    }
    if (this.props.questions.length && (_.find(this.props.questions, ['archived', false]) || this.props.showArchived)) {
      return this.renderQuestions();
    }
    return this.renderNoQuestions();
  }
};

Questions.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default Questions
