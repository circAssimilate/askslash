const $ = require('jquery');
const React = require('react');

const PresentationModeQuestion = require('./PresentationModeQuestion');

module.exports = React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
    refreshAppData: React.PropTypes.func.isRequired,
    toggleVisibility: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      currentQuestionIndex: 0,
      toggleVisibility: React.PropTypes.func.isRequired,
    };
  },

  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
  },

  componentWillUnMount: function() {
    $(document.body).off('keydown', this.handleKeyDown);
  },

  handleKeyDown(event) {
    if (event.keyCode == 37) { // Left Arrow
      this.questionNavigator(-1);
    }
    if (event.keyCode == 39 || event.keyCode == 13 || event.keyCode == 32) { // Right Arrow, Enter, Spacebar
      this.questionNavigator(1);
    }
  },

  questionNavigator(change) {
    const questionCount = this.props.questions.length;
    const questionUp = this.state.currentQuestionIndex + change;
    if (questionUp >= questionCount) {
      return this.setState({
        currentQuestionIndex: 0,
      });
    } else if (questionUp < 0) {
      return this.setState({
        currentQuestionIndex: questionCount - 1,
      });
    }
    return this.setState({
      currentQuestionIndex: questionUp,
    });
  },

  render() {
    const currentQuestion = this.props.questions[this.state.currentQuestionIndex];
    const currentVisibleQuestion = this.state.currentQuestionIndex + 1;
    const questionCount = this.props.questions.length;
    return(
      <div data-ui-hook="presentation-mode"
           className="flex flex--column"
           onKeyDown={this.handleKeyDown}>
        <div className="previous-question question-navigator noselect"
             onClick={ () => { this.questionNavigator(-1) } }>
          {'<'}
        </div>
        <div className="next-question question-navigator noselect"
             onClick={ () => { this.questionNavigator(1) } }>
          {'>'}
        </div>
        <div className="navigation-info">
          { currentVisibleQuestion } of { questionCount }
        </div>
        <div className="progress">
          <div className="progress__bar" style={{width: (currentVisibleQuestion / questionCount) * 100 + '%'}} aria-valuenow={ (currentVisibleQuestion / questionCount) * 100 } aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className="exit noselect" onClick={ this.props.toggleVisibility }>X</div>
        <PresentationModeQuestion
          question={ currentQuestion.question}
          date={ currentQuestion.date }
          author= { currentQuestion.author }
          key= { currentQuestion._id }
        />
      </div>
    );
  }
});