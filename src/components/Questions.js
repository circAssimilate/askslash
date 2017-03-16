const _ = require('lodash');
const React = require('react');

const modules = require('../modules');

const Question = require('./Question');

module.exports = React.createClass({
  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    questions: React.PropTypes.array.isRequired,
    showArchived: React.PropTypes.bool.isRequired,
    showButtons: React.PropTypes.bool.isRequired,
    refreshAppData: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      questions: [],
    };
  },

  archiveQuestion(questionId) {
    const path = `${questionId}/archive`;
    modules.actions.updateQuestion(path)
      .done(response => {
        this.props.refreshAppData();
      });
  },

  unarchiveQuestion(questionId) {
    const path = `${questionId}/unarchive`;
    modules.actions.updateQuestion(path)
      .done(response => {
        this.props.refreshAppData();
      });
  },

  deleteQuestion(questionId) {
    const path = `${questionId}/delete`;
    modules.actions.updateQuestion(path)
      .done(response => {
        this.props.refreshAppData();
      });
  },

  renderNoQuestions() {
    return(
      <section className="soft-double">
        <div className="text--center">
          There are currently no questions for this meeting.
        </div>
      </section>
    );
  },

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
  },

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
  },

  render() {
    if (this.props.isLoading) {
      return this.renderLoading();
    }
    if (this.props.questions.length && (_.find(this.props.questions, ['archived', false]) || this.props.showArchived)) {
      return this.renderQuestions();
    }
    return this.renderNoQuestions();
  }
});