require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/styles.scss');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');

const ouiIcons = require('oui-icons');

const Nav = require('./components/Nav');
const Questions = require('./components/Questions');
const NewQuestion = require('./components/NewQuestion');
const Settings = require('./components/Settings');
const MeetingCta = require('./components/MeetingCta');
const PresentationModeQuestions = require('./components/PresentationModeQuestions');
const Footer = require('./components/Footer');

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

const questions = [
  {
    id: 'h123',
    question: "Optimizely Classic is really beginning to feel like an unwanted guest at the party. Is there any idea internally of when we’re going to sunset Classic?",
    date: "Sun Feb 26 2017 14:23:15 GMT-0800 (PST)",
    author: "Derek Hammond",
  },
  {
    id: 'hd83',
    question: "Shutterstock & On24 are both on the #red account list even though they just signed. #Shutterstock seemed to be an advocate at gtmko. What's happening?",
    date: "Sun Feb 26 2017 12:23:15 GMT-0800 (PST)",
    author: "Jane Doe",
  },
  {
    id: "87hc",
    question: '#secretweapon',
    date: "Sun Feb 26 2017 12:20:15 GMT-0800 (PST)",
    author: "John Doe",
  },
  {
    id: '493s',
    question: "Shutterstock & On24 are both on the red account list even though they just signed. Shutterstock seemed to be an advocate at gtmko. What's happening?",
    date: "Sun Feb 26 2017 08:20:15 GMT-0800 (PST)",
    author: "Derek Hammond",
  },
  {
    id: '9be8',
    question: "Optimizely Classic is really beginning to feel like an unwanted guest at the party. Is there any idea internally of when we’re going to sunset Classic?",
    date: "Sun Feb 25 2017 08:20:15 GMT-0800 (PST)",
    author: "John Doe",
  },
  {
    id: 'l92l',
    question: 'Bill -- Thank you for exhibiting massive customer empathy and transparency and share with us all where we need to improve in order to earn customer trust every day. How will we get regular updates on the customer trust OKR? How frequently will you update at S&T?',
    date: "Sun Dec 25 2016 08:20:15 GMT-0800 (PST)",
    author: "Derek Hammond",
  },
  {
    id: '829z',
    question: "The average C-Level executive has a tenure of 1.8 years at a F-500 company. What is the average C-Level lifetime at Optimizely?",
    date: "Sun Dec 25 2014 08:20:15 GMT-0800 (PST)",
    author: "Jane Doe",
  },
  {
    id: '029f',
    question: "With two senior leaders in Greg and Linda leaving in rapid succession, what external or competitor response do you project for for us? Do you think candidates will feel like we can't hire or retain quality leaders?",
    date: "Sun Mar 25 2010 08:20:15 GMT-0800 (PST)",
    author: "John Doe",
  }
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

  componentDidMount() {
    $(document).keyup(event => {
      if (event.keyCode == 190) {
        this.setState({presentationModeIsVisible: !this.state.presentationModeIsVisible});
      } else if (event.keyCode == 27) {
        this.setState({presentationModeIsVisible: false});
      }
    });
  },

  renderDefaultView() {
    return (
      <div className="main">
        <div className="display--none" dangerouslySetInnerHTML={ {__html: ouiIcons} }></div>
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
        <NewQuestion />
        <Questions questions={ questions }
        />
        <Footer />
      </div>
    );
  },

  renderPresentationMode() {
    return(
      <PresentationModeQuestions
        togglePresentationMode={ this.togglePresentationMode }
        questions={ questions }
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
