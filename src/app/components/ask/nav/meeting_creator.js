const _ = require('lodash');
const React = require('react');
const { Immutable, toImmutable } = require('nuclear-js');

const Dialog = require('app/components/ui/Dialog');

const questionsModule = require('app/modules/questions');

const {
  Button,
  Input,
} = require('optimizely-oui');

class MeetingCreator extends React.Component {
  constructor(props) {
    super(props);

    this.setPropertyFromEvent = this.setPropertyFromEvent.bind(this);
    this.setNextState = this.setNextState.bind(this);
    this.dialogContent = this.dialogContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isSubmitDisabled: true,
      isSubmitting: false,
      form: toImmutable({
        name: '',
        shortId: '',
      }),
    };
  }

  setPropertyFromEvent(event, property, value, shouldNegate = false) {
    const valueToSet = shouldNegate ? !event.target[value] : event.target[value];
    this.setNextState({
      form: this.state.form.set(property, valueToSet),
    });
  }

  setNextState(nextState) {
    this.setState(nextState, () => {
      this.setState({
        isSubmitDisabled: !this.state.form.get('name'),
      });
    });
  }

  dialogContent() {
    return(
      <form>
        <fieldset>
          <ol className="form-fields">
            <li className="form-field__item">
              <label className="oui-label oui-label--required">Meeting Name</label>
              <Input
                placeholder="Company All Hands"
                onChange={ _.partialRight(this.setPropertyFromEvent, 'name', 'value') }
                type="text"/>
            </li>
            <li className="form-field__item">
              <label className="oui-label">
                Meeting ID
                <span className="oui-label__optional">(Optional)</span>
              </label>
              <div className="button-group">
                <Button isDisabled>/</Button>
                <Input
                  placeholder="allhands"
                  onChange={ _.partialRight(this.setPropertyFromEvent, 'shortId', 'value') }
                  type="text"/>
              </div>
              <div className="form-note">This short id (8 characters maximum) will be used in integrations and meeting links. A three-digit id will be generated if left blank.</div>
            </li>
          </ol>
        </fieldset>
      </form>
    );
  }

  onSubmit() {
    const data = {
      creator: 'derek@optimizely.com',
      name: this.state.form.get('name'),
      short_id: this.state.form.get('shortId'),
      date: new Date(),
    };
    questionsModule.actions.createMeeting(data)
      .done(response => {
        const meetingId = response._id;

        questionsModule.actions.setMeetingId(meetingId, () => {
          this.props.refreshAppData(() => {
            this.props.hideComponent();
          });
        });
      });
  }

  render() {
    return(
       <Dialog
         cancelButtonText="Cancel"
         dialogContent={ this.dialogContent }
         dialogTitle="New Meeting"
         hideDialog={ this.props.hideComponent }
         hideCancelOptions={ this.props.noMeetings }
         isSubmitDisabled={ this.state.isSubmitDisabled }
         onSubmit={ this.onSubmit }
         style="default"
         submitButtonText="Create"
      />
    )
  }
};

MeetingCreator.propTypes = {
  hideComponent: React.PropTypes.func.isRequired,
  noMeetings: React.PropTypes.bool.isRequired,
  refreshAppData: React.PropTypes.func.isRequired,
};

export default MeetingCreator
