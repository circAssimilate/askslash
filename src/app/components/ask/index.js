import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import { connect } from 'react-redux';

import Nav from './nav'
import ListMode from './list_mode'
import PresentationMode from './presentation_mode'

import askActions from 'app/modules/ask/actions'

import { ButtonRow, Button, Input } from 'optimizely-oui'

@connect((store) => {
  return {
    questions: store.questions,
  };
})
class Ask extends React.Component {
  constructor(props) {
    super(props);

    // this.togglePresentationMode = this.togglePresentationMode.bind(this);
    // this.toggleSettingsView = this.toggleSettingsView.bind(this);
    // this.toggleShowArchived = this.toggleShowArchived.bind(this);
    // this.toggleShowButtons = this.toggleShowButtons.bind(this);
    // this.setNextState = this.setNextState.bind(this);
    // this.refreshAppData = this.refreshAppData.bind(this);

    this.archiveMeetingQuestions = this.archiveMeetingQuestions.bind(this);
    this.createMeeting = this.createMeeting.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.deleteMeetingQuestions = this.deleteMeetingQuestions.bind(this);
    this.fetchMeetings = this.fetchMeetings.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.setMeeting = this.setMeeting.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);

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

  archiveMeetingQuestions() {
    this.props.dispatch(
      askActions.updateMeetingQuestions('596d200c56ce497ac5aa9728', 'archive')
    );
  }

  createMeeting() {
    this.props.dispatch(
      askActions.createMeeting({
        creator: 'derek@optimizely.com',
        name: 'meeting 1',
        short_id: 'test',
        date: new Date(),
      })
    );
  }

  createQuestion() {
    this.props.dispatch(
      askActions.createQuestion({
        author: 'derek@optimizely.com',
        channel: 'WEB',
        date : new Date(),
        meeting_id: '596d200c56ce497ac5aa9728',
        question: 'new test question...',
      })
    );
  }

  deleteMeetingQuestions() {
    this.props.dispatch(
      askActions.updateMeetingQuestions('596d200c56ce497ac5aa9728', 'delete')
    );
  }

  deleteMeeting(event) {
    if (event.keyCode === 13) {
      this.props.dispatch(
        askActions.deleteMeeting(event.target.value)
      );
    }
  }

  fetchMeetings() {
    this.props.dispatch(
      askActions.fetchMeetings()
    );
  }

  fetchQuestions() {
    this.props.dispatch(
      askActions.fetchQuestions('596d200c56ce497ac5aa9728')
    );
  }

  setMeeting(event) {
    if (event.keyCode === 13) {
      this.props.dispatch(
        askActions.setMeeting(event.target.value)
      );
    }
  }

  updateQuestion(event, instruction) {
    if (event.keyCode === 13) {
      this.props.dispatch(
        askActions.updateQuestion(event.target.value, instruction)
      );
    }
  }

  // togglePresentationMode() {
  //   this.setNextState({presentationModeIsVisible: !this.state.presentationModeIsVisible});
  // }
  //
  // toggleSettingsView() {
  //   this.setNextState({settingsIsVisible: !this.state.settingsIsVisible});
  // }
  //
  // toggleShowArchived() {
  //   this.setNextState({showArchived: !this.state.showArchived});
  // }
  //
  // toggleShowButtons() {
  //   this.setNextState({showButtons: !this.state.showButtons});
  // }
  //
  // setNextState(nextState) {
  //   this.setState(nextState, () => {
  //
  //   });
  // }
  //
  // refreshAppData(callback = () => {}) {
  //   questionsModule.actions.getMeetings()
  //     .done(response => {
  //       const selectedMeeting = _.find(response.meetings, ['_id', questionsModule.actions.getMeetingId()]);
  //       this.setNextState({
  //         meetings: response.meetings,
  //         selectedMeeting: selectedMeeting || response.meetings[0] || {},
  //       });
  //       if (response.meetings.length) {
  //         questionsModule.actions.getQuestions(this.state.selectedMeeting._id)
  //           .done(response => {
  //             this.setNextState({
  //               isLoading: false,
  //               questions: response.questions,
  //             });
  //             callback();
  //           })
  //           .fail(err => {
  //             console.log('There was an error retrieving questions', err);
  //           });
  //       } else {
  //         this.setNextState({isLoading: false});
  //       }
  //     })
  //     .fail(err => {
  //       console.log('There was an error retrieving meetings', err);
  //     });
  // }
  //
  componentWillMount() {
    // this.setNextState({userId: questionsModule.actions.getOrCreateUserId()});
    this.props.dispatch(
      askActions.fetchMeetings()
    );
    this.props.dispatch(
      askActions.fetchQuestions('596d200c56ce497ac5aa9728')
    );
  }

  currentView() {
    switch ('list_mode') {
      case 'list_mode':
        return (
          <div></div>
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
        {/* <Nav
          archivedVisible={ this.state.showArchived }
          buttonsVisible={ this.state.showButtons }
          isLoading={ this.state.isLoading }
          meetings={ this.state.meetings }
          questions={ this.state.questions }
          refreshAppData={ this.refreshAppData }
          selectedMeeting={ this.state.selectedMeeting }
          toggleShowArchived={ this.toggleShowArchived }
          toggleShowButtons={ this.toggleShowButtons }
        /> */}
        <ol className="form-fields">
          <li className="form-field__item">
            <h2 className="reverse">Questions</h2>
          </li>
          <li className="form-field__item">
            <ButtonRow
              leftGroup={[
                <Button key="1" onClick={this.fetchQuestions}>Fetch Questions</Button>,
                <Button key="2" onClick={this.createQuestion}>Create Question</Button>,
                <Button key="3" onClick={this.deleteMeetingQuestions}>Delete All Questions</Button>,
                <Button key="4" onClick={this.archiveMeetingQuestions}>Archive All Questions</Button>,
              ]}
            />
          </li>
          <li className="form-field__item">
            <Input type="text" placeholder="Unarchive Question" onKeyDown={event => {this.updateQuestion(event, 'unarchive')}}/>
          </li>
          <li className="form-field__item">
            <Input type="text" placeholder="Archive Question" onKeyDown={event => {this.updateQuestion(event, 'archive')}}/>
          </li>
          <li className="form-field__item">
            <h2 className="reverse">Meetings</h2>
          </li>
          <li className="form-field__item">
            <ButtonRow
              leftGroup={[
                <Button key="1" onClick={this.fetchMeetings}>Fetch Meetings</Button>,
                <Button key="2" onClick={this.createMeeting}>Create Meeting</Button>,
              ]}
            />
          </li>
          <li className="form-field__item">
            <Input type="text" placeholder="Set Meeting" onKeyDown={event => {this.setMeeting(event)}}/>
          </li>
          <li className="form-field__item">
            <Input type="text" placeholder="Delete Meeting" onKeyDown={event => {this.deleteMeeting(event)}}/>
          </li>
        </ol>

        { this.currentView() }
      </div>
    );
  }
};

export default Ask;
