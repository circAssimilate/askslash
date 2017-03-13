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
} = require('optimizely-oui');

const Nav = require('./components/Nav');
const Questions = require('./components/Questions');
const NewQuestion = require('./components/NewQuestion');
const Footer = require('./components/Footer');

const App = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
      questions: [],
      meetings: [],
      selectedMeeting: {},
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

  refreshAppData() {
    modules.actions.getQuestions()
      .done(response => {
        this.setState({questions: response.questions});
      })
      .fail(err => {
        console.log('There was an error retrieving questions', err);
      });

    modules.actions.getMeetings()
      .done(response => {
        this.setState({meetings: response.meetings});
        this.setState({selectedMeeting: this.state.meetings[0]});
      })
      .fail(err => {
        console.log('There was an error retrieving meetings', err);
      });
  },

  componentWillMount() {
    this.refreshAppData();
  },

  render() {
    return (
      <div className="main">
        <div className="display--none" dangerouslySetInnerHTML={ {__html: ouiIcons} }></div>
        <Nav
          refreshAppData={ this.refreshAppData }
          meetings={ this.state.meetings }
          questions={ this.state.questions }
          meetingName={ this.state.selectedMeeting && this.state.selectedMeeting.name || '' }
          meetingId={ this.state.selectedMeeting && this.state.selectedMeeting.short_id || '' }
        />
        <NewQuestion
          refreshAppData={ this.refreshAppData }
        />
        <Questions questions={ this.state.questions } />
        <Footer />
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
