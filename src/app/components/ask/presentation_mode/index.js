const _ = require('lodash');
const $ = require('jquery');
const React = require('react');

const Question = require('./question');

class PresentationMode extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.questionNavigator = this.questionNavigator.bind(this);
    this.renderNoQuestions = this.renderNoQuestions.bind(this);

    this.state = {
      currentQuestionIndex: 0,
    };
  }

  componentDidMount() {
    $(document.body).on('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    $(document.body).off('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.keyCode == 37) { // Left Arrow
      this.questionNavigator(-1);
    }
    if (event.keyCode == 39 || event.keyCode == 13 || event.keyCode == 32) { // Right Arrow, Enter, Spacebar
      this.questionNavigator(1);
    }
  }

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
  }

  renderNoQuestions() {
    return(
      <div className="flex flex--column presentation-mode">
        <div className="flex--1 flex flex--column presentation-mode-question-wrapper">
          <div className="flex--dead-center flex--1 weight--light">
            There are currently no questions for this meeting.
          </div>
        </div>
      </div>
    );
  }

  renderQuestions() {
    const currentQuestion = this.props.questions[this.state.currentQuestionIndex];
    const currentVisibleQuestion = this.state.currentQuestionIndex + 1;
    const questionCount = this.props.questions.length;
    return(
      <div className="flex flex--column presentation-mode">
        <div className="navigation-info">
          { currentVisibleQuestion } of { questionCount }
        </div>
        <Question
          question={ currentQuestion.question}
          date={ currentQuestion.date }
          author= { currentQuestion.author }
          key= { currentQuestion._id }
        />
        <div className="progress anchor--middle">
          <div className="progress__bar" style={{width: (currentVisibleQuestion / questionCount) * 100 + '%'}} aria-valuenow={ (currentVisibleQuestion / questionCount) * 100 } aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div onKeyDown={this.handleKeyDown}>
        <div className="exit noselect" onClick={ this.props.hideComponent }>X</div>
        { this.props.questions.length ? this.renderQuestions() : this.renderNoQuestions()}
      </div>
    );
  }
};

PresentationMode.propTypes = {
  hideComponent: React.PropTypes.func.isRequired,
  questions: React.PropTypes.array.isRequired,
};

export default PresentationMode
