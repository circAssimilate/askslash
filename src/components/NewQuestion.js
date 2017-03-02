const React = require('react');

const modules = require('../modules');

const {
  ButtonRow,
  Button,
  Textarea
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    getQuestions: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      isCollapsed: true,
      question: '',
    };
  },

  // constructor(props) {
  //   super(props);
  //   this.state = {value: ''};
  //
  //   this.handleChange = this.handleChange.bind(this);
  //   // this.handleSubmit = this.handleSubmit.bind(this);
  // },

  // handleChange(event) {
  //   console.log('event.target.value', event.target.value);
  //   this.setState({value: event.target.value});
  // },

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // },

  postRegularQuestion() {
    this.postQuestion();
  },

  postAnonymousQuestion() {
    this.postQuestion(true);
  },

  postQuestion(anoymous=false) {
    let question = 'Hi. Is this thing on? I was wondering if I Script tag here - <script>//scripts</script> - Script there could #help out. *italics*, **bold** <div onclick="">Testing div with onclick event</div> <span>Testing span</span> https://google.com [Google.com](https://google.com)?';
    question = modules.fns.sanitizeQuestionAndConvertMarkdownToHtml(question);

    let randomHour = Math.floor(Math.random() * 24)

    const data = {
      question: question,
      author: anoymous ? 'Anonymous' : 'derek@optimizely.com',
      date : `Wed Mar 01 2017 ${randomHour}:25:57 GMT-0800 (PST)`,
    };
    modules.actions.postQuestion(data)
      .done(response => {
        this.props.getQuestions();
      })
      .fail(err => {
        console.log('There was an error retrieving questinos', err);
      });
  },

  toggleQuestionBox() {
    this.setState({isCollapsed: !this.state.isCollapsed});
  },

  renderCollapsed() {
    return(<div className="push-double--top">
        <Button
          width="full"
          style="highlight"
          onClick={ this.toggleQuestionBox }>
          Ask Question
        </Button>
      </div>
    );
  },

  renderExpanded() {
    return(
      <section>
        <div>
          <Textarea
            placeholder="Your question here..."
          />
          <div className="push--top">
            <ButtonRow
              rightGroup={[
                <Button
                  key="1"
                  style="plain"
                  width="default"
                  onClick={ this.toggleQuestionBox }>
                  Cancel
                </Button>,
                <Button
                  key="2"
                  onClick={ this.postAnonymousQuestion }
                  style="outline"
                  width="default">
                  Ask anonymously
                </Button>,
                <Button
                  key="3"
                  onClick={ this.postRegularQuestion }
                  style="highlight"
                  width="default">
                  Submit question
                </Button>
              ]}
             />
          </div>
        </div>
      </section>
    )
  },

  render() {
    if (this.state.isCollapsed) {
      return this.renderCollapsed();
    }
    return this.renderExpanded();
  }
});
