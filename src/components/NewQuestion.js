const _ = require('lodash');
const $ = require('jquery');
const React = require('react');
const { Immutable, toImmutable } = require('nuclear-js');

const modules = require('../modules');

const {
  ButtonRow,
  Button,
  Checkbox,
  Textarea,
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    refreshAppData: React.PropTypes.func.isRequired,
    selectedMeeting: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      isSubmitDisabled: true,
      isSubmitting: false,
      keystrokes: {},
      form: toImmutable({
        anonymous: false,
        question: '',
      }),
    };
  },

  setPropertyFromEvent(event, property, value, shouldNegate = false) {
    const valueToSet = shouldNegate ? !event.target[value] : event.target[value];
    this.setNextState({
      form: this.state.form.set(property, valueToSet),
    });
  },

  setNextState(nextState) {
    this.setState(nextState, () => {
      this.setState({
        isSubmitDisabled: !this.state.form.get('question'),
      });
    });
  },

  handleKeyDown(event) {
    this.setNextState({
      keystrokes: _.extend(this.state.keystrokes, {
        [event.keyCode]: event.type == 'keydown',
      }),
    });

    if (this.state.keystrokes[13] && this.state.keystrokes[91] && !this.state.formSubmitted && this.state.form.get('question')) { // Command + Enter
      this.setNextState({formSubmitted: true});
      this.onSubmit();
    }
  },

  handleKeyUp(event) {
    this.setNextState({
      keystrokes: {},
    });
  },

  onSubmit() {
    const data = {
      author: this.state.form.get('anonymous') ? 'Anonymous' : 'derek@optimizely.com',
      channel: modules.enums.channel.WEB,
      date : new Date(),
      meeting_id: this.props.selectedMeeting._id,
      question: this.state.form.get('question'),
    };
    modules.actions.postQuestion(data)
      .done(response => {
        this.setNextState({
          formSubmitted: false,
          form: this.state.form
            .set('anonymous', false)
            .set('question', ''),
        });
        this.props.refreshAppData();
      });
  },

  render() {
    return(
      <section className="anchor--middle push-double--ends soft-double"
               onKeyDown={ this.handleKeyDown }
               onKeyUp={ this.handleKeyUp }>
        <div>
          <Textarea
            placeholder="Your question here..."
            value={ this.state.form.get('question') }
            onChange={ _.partialRight(this.setPropertyFromEvent, 'question', 'value') }
          />
          <div className="push--top">
            <Checkbox
              label="Submit anonymously"
              checked={ this.state.form.get('anonymous') }
              onChange={ _.partialRight(this.setPropertyFromEvent, 'anonymous', 'checked') }
            />
          </div>
          <div className="push--top">
            <ButtonRow
              rightGroup={[
                <Button
                  key="1"
                  isDisabled={ this.state.isSubmitDisabled }
                  onClick={ this.onSubmit }
                  style="highlight"
                  width="default">
                  Post
                </Button>
              ]}
             />
          </div>
        </div>
      </section>
    );
  },
});
