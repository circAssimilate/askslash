require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/styles.scss');

const _ = require('lodash');
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
      userId: null,
      isLoading: false,
      questions: [],
      meetings: [],
      selectedMeeting: {},
      presentationModeIsVisible: false,
      settingsIsVisible: false,
      showArchived: false,
    };
  },

  togglePresentationMode() {
    this.setState({presentationModeIsVisible: !this.state.presentationModeIsVisible});
  },

  toggleSettingsView() {
    this.setState({settingsIsVisible: !this.state.settingsIsVisible});
  },

  toggleShowArchived() {
    this.setState({showArchived: !this.state.showArchived});
  },

  refreshAppData() {
    modules.actions.getMeetings()
      .done(response => {
        const selectedMeeting = _.find(response.meetings, ['_id', modules.actions.getMeetingId()]);
        this.setState({
          meetings: response.meetings,
          selectedMeeting: selectedMeeting || response.meetings[0],
        });

        modules.actions.getQuestions(this.state.selectedMeeting)
          .done(response => {
            this.setState({questions: response.questions});
          })
          .fail(err => {
            console.log('There was an error retrieving questions', err);
          });
      })
      .fail(err => {
        console.log('There was an error retrieving meetings', err);
      });
  },

  componentWillMount() {
    this.setState({userId: modules.actions.getOrCreateUserId()});
    this.refreshAppData();
  },

  render() {
    return (
      <div className="main anchor--middle push-triple--ends">
        <div className="display--none" dangerouslySetInnerHTML={ {__html: ouiIcons} }></div>
        <Nav
          toggleShowArchived={ this.toggleShowArchived }
          archivedVisible={ this.state.showArchived }
          refreshAppData={ this.refreshAppData }
          meetings={ this.state.meetings }
          questions={ this.state.questions }
          meetingId={ this.state.selectedMeeting && this.state.selectedMeeting._id || '' }
          meetingName={ this.state.selectedMeeting && this.state.selectedMeeting.name || '' }
          meetingShortId={ this.state.selectedMeeting && this.state.selectedMeeting.short_id || '' }
        />
        <NewQuestion
          selectedMeeting={ this.state.selectedMeeting }
          refreshAppData={ this.refreshAppData }
        />
        <Questions
          showArchived={ this.state.showArchived }
          refreshAppData={ this.refreshAppData }
          questions={ this.state.questions }
        />
        <Footer />
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
