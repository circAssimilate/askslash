const React = require('react');
const modules = require('../modules');

const {
  ButtonRow,
  Button,
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    archiveQuestion: React.PropTypes.func.isRequired,
    deleteQuestion: React.PropTypes.func.isRequired,
    question: React.PropTypes.object.isRequired,
    showButtons: React.PropTypes.bool.isRequired,
    unarchiveQuestion: React.PropTypes.func.isRequired,
  },

  renderInfoRow() {
    return(
      <div
        className="display--inline-block push--right"
        key="1">
        By <span className="highlight">{ this.props.question.author }</span> { modules.fns.renderTimeSincePosted(this.props.question.date) } via { this.props.question.channel }
      </div>
    );
  },

  renderInfoRowWithButtons() {
    return(
      <ButtonRow
        leftGroup={[
          <div
            className="display--inline-block push--right"
            key="1">
            By <span className="highlight">{ this.props.question.author }</span> { modules.fns.renderTimeSincePosted(this.props.question.date) } via { this.props.question.channel }
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
  },

  render() {
    return(
      <li className={ this.props.question.archived ? "push--ends question faded" : "push--ends question"}>
        <div dangerouslySetInnerHTML={{__html: modules.fns.sanitizeQuestionAndConvertMarkdownToHtml(this.props.question.question) }}></div>
        <div className="question-info push-double--top">
          { this.props.showButtons ? this.renderInfoRowWithButtons() : this.renderInfoRow() }
        </div>
      </li>
    );
  }
});
