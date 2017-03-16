const _ = require('lodash');
const $ = require('jquery');
const modules = require('../modules');
const React = require('react');
const { Immutable, toImmutable } = require('nuclear-js');

const NewMeeting = require('./NewMeeting');
const MeetingCta = require('./MeetingCta');
const PresentationMode = require('./PresentationMode');
const Settings = require('./Settings');

const phoneNumber = '6144-OPTIFY (614-467-8439)';
const slackShortcut = '/ask';
const ctaIntervalInSeconds = 5;

const {
  ArrowsInline,
} = require('optimizely-oui');

module.exports = React.createClass({
  propTypes: {
    archivedVisible: React.PropTypes.bool.isRequired,
    buttonsVisible: React.PropTypes.bool.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    meetings: React.PropTypes.array.isRequired,
    questions: React.PropTypes.array.isRequired,
    refreshAppData: React.PropTypes.func.isRequired,
    selectedMeeting: React.PropTypes.object.isRequired,
    toggleShowArchived: React.PropTypes.func.isRequired,
    toggleShowButtons: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      menuOpen: false,
      keystrokes: {},
      subMenuVisible: toImmutable({
        newMeeting: false,
        presentationMode: false,
        settings: false,
      }),
    };
  },

  setNextState(nextState) {
    this.setState(nextState, () => {

    });
  },

  toggleSubMenuVisibility(property, open = true) {
    this.setNextState({
      subMenuVisible: this.state.subMenuVisible.set(property, open),
    });
  },

  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
    $(document.body).on('click', this.handleClick);
    $(document.body).on('keyup', this.handleKeyUp);
  },

  componentWillUnmount: function() {
    $(document.body).off('keydown', this.handleKeyDown);
    $(document.body).off('click', this.handleClick);
    $(document.body).off('keyup', this.handleKeyUp);
  },

  handleClick(event) {
    if(!$(event.target).closest('[data-ui-hook="current-meeting"]').length) {
      if($('[data-ui-hook="nav-list"]').is(":visible")) {
        this.setNextState({menuOpen: false});
      }
    }
  },

  handleKeyDown(event) {
    this.setNextState({
      keystrokes: _.extend(this.state.keystrokes, {
        [event.keyCode]: event.type == 'keydown',
      }),
    });

    if (this.state.keystrokes[93] && this.state.keystrokes[16] && this.state.keystrokes[27]) { // Command + Shift + Esc
      this.props.toggleShowArchived();

    } else if (this.state.keystrokes[93] && this.state.keystrokes[27]) { // Command + Esc
      this.props.toggleShowButtons();

    } else if (event.keyCode == 27) { // Esc
      if (this.state.menuOpen) {
        this.setNextState({menuOpen: false});
      } else {
        if (!$('.dialog-container').length) {
          this.toggleSubMenuVisibility('presentationMode', !this.state.subMenuVisible.get('presentationMode'));
        }
      }
    }
  },

  handleKeyUp(event) {
    this.setNextState({
      keystrokes: {},
    });
  },

  changeMeeting(meetingId) {
    modules.actions.setMeetingId(meetingId, this.props.refreshAppData);
  },

  deleteMeeting() {
    modules.actions.deleteMeeting(this.props.selectedMeeting._id)
      .done(response => {
        this.props.refreshAppData();
      });
  },

  archiveMeetingQuestions() {
    const path = `${this.props.selectedMeeting._id}/archive`;
    modules.actions.archiveMeetingQuestions(path)
      .done(response => {
        this.props.refreshAppData();
      });
  },

  toggleMenuVisibility() {
    this.setNextState({menuOpen: !this.state.menuOpen});
  },

  renderMeetingCta() {
    return(
      <MeetingCta
        meetingShortId={ this.props.selectedMeeting.short_id }
        phoneNumber={ phoneNumber }
        slackShortcut={ slackShortcut }
        ctaIntervalInSeconds= { ctaIntervalInSeconds }
      />
    );
  },

  renderNewMeetingDialog() {
    return(
      <NewMeeting
        refreshAppData={ this.props.refreshAppData }
        hideComponent={ () => { this.toggleSubMenuVisibility('newMeeting', false) } }
        noMeetings={ this.props.meetings.length === 0 }
      />
    );
  },

  renderPresentationMode() {
    return(
      <PresentationMode
        questions={ _.filter(this.props.questions, ['archived', false]) }
        hideComponent={ () => { this.toggleSubMenuVisibility('presentationMode', false) } }
      />
    );
  },

  renderSettingsDialog() {
    return(
      <Settings
        refreshAppData={ this.props.refreshAppData }
        hideComponent={ () => { this.toggleSubMenuVisibility('settings', false) } }
      />
    );
  },

  render() {
    return(
      <div onClick={ this.handleClick }>
        { !this.props.isLoading && (this.props.meetings.length === 0 || this.state.subMenuVisible.get('newMeeting')) ? this.renderNewMeetingDialog() : '' }
        { this.state.subMenuVisible.get('presentationMode') ? this.renderPresentationMode() : '' }
        { this.state.subMenuVisible.get('settings') ? this.renderSettingsDialog() : '' }
        <nav className="reverse text--center">
          <div className="dropdown-group">
            <h1 data-ui-hook="current-meeting"
                className="display-inline--block noselect"
                onMouseDown={ this.toggleMenuVisibility }
                onMouseUp={ this.props.onMouseUp }>
              Ask<span className="push-half--sides">/</span><span className="weight--bold">{ this.props.selectedMeeting.name || '' }</span> <ArrowsInline direction={ this.state.menuOpen ? 'up' : 'down' } />
            </h1>
            <ul data-ui-hook="nav-list"
                style={{display: this.state.menuOpen ? 'block' : 'none'}}
                className="dropdown width--200">
              <li onClick={ () => { this.toggleSubMenuVisibility('presentationMode', !this.state.subMenuVisible.get('presentationMode')) } }
                  className="dropdown__item">
                <a className="dropdown__block-link">
                  <div className="flex">
                    <span className="flex flex-align--center">
                      <svg className="icon push-half--right ">
                        <use xlinkHref="#desktop-16"></use>
                      </svg>
                    </span>
                    <span className="flex flex-align--center">
                      { this.state.subMenuVisible.get('presentationMode') ? 'Exit' : 'Enter' } Presentation Mode
                    </span>
                  </div>
                </a>
              </li>
              <li onClick={ () => { this.toggleSubMenuVisibility('settings') } }
                  className="dropdown__item">
                <a className="flex">
                  <span className="flex flex-align--center">
                    <svg className="icon push-half--right ">
                      <use xlinkHref="#settings-16"></use>
                    </svg>
                  </span>
                  <span className="flex flex-align--center weight--bold">
                    Settings
                  </span>
                </a>
              </li>
              <li className="dropdown__item">
                <a className="flex">
                  <span className="flex flex-align--center">
                    <svg className="icon push-half--right ">
                      <use xlinkHref="#variation-settings-16"></use>
                    </svg>
                  </span>
                  <span className="flex flex-align--center weight--bold">
                    Options
                  </span>
                </a>
                <a className="dropdown__block-link"
                   onClick={ this.props.toggleShowButtons }>
                  { this.props.buttonsVisible ? 'Hide' : 'Show' } Buttons
                </a>
                <a className="dropdown__block-link"
                   onClick={ () => { this.toggleSubMenuVisibility('newMeeting') } }>
                  Create Meeting
                </a>
                <a className="dropdown__block-link"
                   onClick={ this.deleteMeeting }>
                  Delete Meeting
                </a>
                <a className="dropdown__block-link"
                   onClick={ this.archiveMeetingQuestions }>
                  Archive All Questions
                </a>
                <a className="dropdown__block-link"
                   onClick={ this.props.toggleShowArchived }>
                  { this.props.archivedVisible ? 'Hide' : 'Show' } Archived Questions
                </a>
              </li>
              <li className="dropdown__item">
                <a className="flex">
                  <span className="flex flex-align--center">
                    <svg className="icon push-half--right ">
                      <use xlinkHref="#audiences-16"></use>
                    </svg>
                  </span>
                  <span className="flex flex-align--center weight--bold">
                    Meetings
                  </span>
                </a>
                { this.props.meetings.map((meeting, index) => {
                  return (
                    <a onClick={ () => { this.changeMeeting(meeting._id) } }
                       data-id={ meeting._id }
                       className="dropdown__block-link"
                       key={index}>
                      { meeting.name }
                    </a>
                  );
                })}
              </li>
            </ul>
          </div>
          { _.isEmpty(this.props.selectedMeeting) ? '' : this.renderMeetingCta() }
        </nav>
      </div>
    );
  }
});
