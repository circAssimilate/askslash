require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/styles.scss');

const $ = require('jquery');
const modules = require('./modules');
const ouiIcons = require('oui-icons');
const React = require('react');
const ReactDOM = require('react-dom');

const {
  ButtonRow,
  Button,
  Input,
  Textarea
} = require('optimizely-oui');

const Nav = require('./components/Nav');
const Questions = require('./components/Questions');
const NewQuestion = require('./components/NewQuestion');
const Settings = require('./components/Settings');
const MeetingCta = require('./components/MeetingCta');
const PresentationModeQuestions = require('./components/PresentationModeQuestions');
const Footer = require('./components/Footer');
const Dialog = require('./ui_components/Dialog');

const meetingId = 'gtm';
const phoneNumber = '6144-OPTIFY (614-467-8439)';
const slackShortcut = '/ask';
const ctaIntervalInSeconds = 5;
const selectedMeeting = {
  name: 'Global Show & Tell',
  id: 'gst',
}


const meetingList = [
  {
    name: "Global Show & Tell",
    id: "gst",
  },
  {
    name: "Q3 Review",
    id: "abcd",
  },
  {
    name: "GTM Kickoff",
    id: "920d",
  },
];

const App = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
      questions: [],
      presentationModeIsVisible: false,
      settingsIsVisible: false,
    };
  },

  togglePresentationMode() {
    this.setState({presentationModeIsVisible: !this.state.presentationModeIsVisible});
  },

  toggleSettingsView() {
    this.setState({settingsIsVisible: !this.state.settingsIsVisible});
  },

  getQuestions() {
    modules.actions.getQuestions()
      .done(response => {
        this.setState({questions: response.questions});
      })
      .fail(err => {
        console.log('There was an error retrieving questinos', err);
      });
  },

  meetingDialogContent() {
    return(
      <div>
        <p>Give us some more details on this meeting</p>
        <div className="push--bottom">
          <Input
            placeholder="Meeting Name"
            type="text"/>
        </div>
        <div className="push--bottom">
          <Input
            placeholder="Short Meeting ID"
            type="text"/>
        </div>
        <div className="push--bottom">
          <Textarea placeholder="This meeting is for our monthly, company-wide meeting…" />
        </div>
      </div>
    )
  },

  componentWillMount() {
    this.getQuestions();
  },

  renderDefaultView() {
    return (
      <div className="main">
        <div className="display--none" dangerouslySetInnerHTML={ {__html: ouiIcons} }></div>

        <Dialog
          dialogTitle="Create a Meeting"
          dialogContent={ this.meetingDialogContent }
          onSubmit={ this.getQuestions }
          submitButtonText="Create"
          cancelButtonText="Cancel"
          style='narrow'
        />

        <Nav
          selectedMeeting={ selectedMeeting }
          meetingList={ meetingList }
          togglePresentationMode={ this.togglePresentationMode }
          toggleSettingsView={ this.toggleSettingsView }
        />
        <MeetingCta
          meetingId= { meetingId }
          phoneNumber={ phoneNumber }
          slackShortcut={ slackShortcut }
          ctaIntervalInSeconds= { ctaIntervalInSeconds }
        />
        <NewQuestion
          getQuestions={ this.getQuestions }
        />
        <Questions questions={ this.state.questions }
        />
        <Footer />
      </div>
    );
  },

  renderPresentationMode() {
    return(
      <PresentationModeQuestions
        togglePresentationMode={ this.togglePresentationMode }
        questions={ this.state.questions }
      />
    );
  },

  renderSettingsView() {
    return(
      <div className="main">
        <div className="display--none" dangerouslySetInnerHTML={ {__html: ouiIcons} }></div>
        <Settings toggleSettingsView={ this.toggleSettingsView } />
      </div>
    );
  },

  render() {
    if (this.state.presentationModeIsVisible) {
      return this.renderPresentationMode();
    }

    if(this.state.settingsIsVisible) {
      return this.renderSettingsView();
    }

    return this.renderDefaultView();
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
