require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/styles.scss');

const _ = require('lodash');
const $ = require('jquery');
const modules = require('./modules');
const ouiIcons = require('oui-icons');
const React = require('react');
const ReactDOM = require('react-dom');

const Footer = require('./components/Footer');
const Nav = require('./components/Nav');
const NewQuestion = require('./components/NewQuestion');
const Questions = require('./components/Questions');

const {
  ButtonRow,
  Button,
} = require('optimizely-oui');

const App = React.createClass({
  getInitialState() {
    return {
      userId: null,
      isLoading: true,
      questions: [],
      meetings: [],
      selectedMeeting: {},
      presentationModeIsVisible: false,
      settingsIsVisible: false,
      showArchived: false,
      showButtons: false,
    };
  },

  togglePresentationMode() {
    this.setNextState({presentationModeIsVisible: !this.state.presentationModeIsVisible});
  },

  toggleSettingsView() {
    this.setNextState({settingsIsVisible: !this.state.settingsIsVisible});
  },

  toggleShowArchived() {
    this.setNextState({showArchived: !this.state.showArchived});
  },

  toggleShowButtons() {
    this.setNextState({showButtons: !this.state.showButtons});
  },

  setNextState(nextState) {
    this.setState(nextState, () => {

    });
  },

  refreshAppData(callback = () => {}) {
    modules.actions.getMeetings()
      .done(response => {
        const selectedMeeting = _.find(response.meetings, ['_id', modules.actions.getMeetingId()]);
        this.setNextState({
          meetings: response.meetings,
          selectedMeeting: selectedMeeting || response.meetings[0] || {},
        });
        if (response.meetings.length) {
          modules.actions.getQuestions(this.state.selectedMeeting._id)
            .done(response => {
              this.setNextState({
                isLoading: false,
                questions: response.questions,
              });
              callback();
            })
            .fail(err => {
              console.log('There was an error retrieving questions', err);
            });
        } else {
          this.setNextState({isLoading: false});
        }
      })
      .fail(err => {
        console.log('There was an error retrieving meetings', err);
      });
  },

  componentWillMount() {
    this.setNextState({userId: modules.actions.getOrCreateUserId()});
    this.refreshAppData();
  },

  render() {
    return (
      <div className="main anchor--middle push-triple--ends">
        <div className="display--none" dangerouslySetInnerHTML={ {__html: ouiIcons} }></div>
        <Nav
          archivedVisible={ this.state.showArchived }
          buttonsVisible={ this.state.showButtons }
          isLoading={ this.state.isLoading }
          meetings={ this.state.meetings }
          questions={ this.state.questions }
          refreshAppData={ this.refreshAppData }
          selectedMeeting={ this.state.selectedMeeting }
          toggleShowArchived={ this.toggleShowArchived }
          toggleShowButtons={ this.toggleShowButtons }
        />
        <NewQuestion
          refreshAppData={ this.refreshAppData }
          selectedMeeting={ this.state.selectedMeeting }
        />
        <Questions
          isLoading={ this.state.isLoading }
          questions={ this.state.questions }
          refreshAppData={ this.refreshAppData }
          showArchived={ this.state.showArchived }
          showButtons={ this.state.showButtons }
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
