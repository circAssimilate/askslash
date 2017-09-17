import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'
import $ from 'jquery'
import React from 'react'

import Nav from './nav'
import ListMode from './list_mode'
import PresentationMode from './presentation_mode'

import questionsModule from 'app/modules/questions'
import { ButtonRow, Button } from 'optimizely-oui'

class Ask extends React.Component {
  constructor(props) {
    super(props);

    this.togglePresentationMode = this.togglePresentationMode.bind(this);
    this.toggleSettingsView = this.toggleSettingsView.bind(this);
    this.toggleShowArchived = this.toggleShowArchived.bind(this);
    this.toggleShowButtons = this.toggleShowButtons.bind(this);
    this.setNextState = this.setNextState.bind(this);
    this.refreshAppData = this.refreshAppData.bind(this);

    this.state = {
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
  }

  togglePresentationMode() {
    this.setNextState({presentationModeIsVisible: !this.state.presentationModeIsVisible});
  }

  toggleSettingsView() {
    this.setNextState({settingsIsVisible: !this.state.settingsIsVisible});
  }

  toggleShowArchived() {
    this.setNextState({showArchived: !this.state.showArchived});
  }

  toggleShowButtons() {
    this.setNextState({showButtons: !this.state.showButtons});
  }

  setNextState(nextState) {
    this.setState(nextState, () => {

    });
  }

  refreshAppData(callback = () => {}) {
    questionsModule.actions.getMeetings()
      .done(response => {
        const selectedMeeting = _.find(response.meetings, ['_id', questionsModule.actions.getMeetingId()]);
        this.setNextState({
          meetings: response.meetings,
          selectedMeeting: selectedMeeting || response.meetings[0] || {},
        });
        if (response.meetings.length) {
          questionsModule.actions.getQuestions(this.state.selectedMeeting._id)
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
  }

  componentWillMount() {
    this.setNextState({userId: questionsModule.actions.getOrCreateUserId()});
    this.refreshAppData();
  }

  currentView() {
    switch ('list_mode') {
      case 'list_mode':
        return (
          <div>Test</div>
          // <ListMode
          //   questions={this.state.questions}
          // />
        );
        break;
      case 'presentation_mode':
        return (<PresentationMode/>);
        break;
      default:
        return (<ListMode/>);
    }
  }

  render() {
    return (
      <div className="main anchor--middle push-triple--ends">
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
        { this.currentView() }
      </div>
    );
  }
};

export default Ask;
