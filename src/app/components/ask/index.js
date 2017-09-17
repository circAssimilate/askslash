import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'
import $ from 'jquery'
import ouiIcons from 'oui-icons'
import React from 'react'
import ReactDOM from 'react-dom'

import Nav from './nav'
import QuestionCreator from './question_creator'
import ListMode from './list_mode'
const PresentationMode = require('./presentation_mode');

import questionsModule from 'app/modules/questions'
import { ButtonRow, Button } from 'optimizely-oui'

import 'assets/stylesheets/base.scss'
import 'assets/stylesheets/styles.scss'

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
        <ListMode
          isLoading={ this.state.isLoading }
          questions={ this.state.questions }
          refreshAppData={ this.refreshAppData }
          showArchived={ this.state.showArchived }
          showButtons={ this.state.showButtons }
        />
        <PresentationMode
          questions={ _.filter(this.props.questions, ['archived', false]) }
          hideComponent={ () => { this.toggleSubMenuVisibility('presentationMode', false) } }
        />
      </div>
    );
  }
};

export default Ask
