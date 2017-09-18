import _ from 'lodash'
import actions from './actions'
import constants from './constants'

export default (state={}, action) => {
  switch (action.type) {
    case constants.actions.CREATE_MEETING:
      return _.merge(state, {
        meetings: [
          ...state.meetings,
          action.meeting
        ]
      });
    case constants.actions.CREATE_QUESTION:
      return _.merge(state, {
        questions: [
          ...state.questions,
          action.question
        ]
      });
    case constants.actions.DELETE_MEETING:
      const updatedMeetings = _.map(state.meetings, meeting => {
        if (meeting['_id'] !== action.meetingId) {
          return meeting;
        }
      })
      return _.merge(state, {
        meetings: updatedMeetings
      });
    case constants.actions.FETCH_MEETINGS:
      return _.merge(state, {
        meetings: action.meetings
      });
    case constants.actions.FETCH_QUESTIONS:
      return _.merge(state, {
        questions: action.questions
      });
    case constants.actions.SET_MEETING:
      return _.merge(state, {
        currentMeeting: action.meetingId,
      });
    case constants.actions.UPDATE_MEETING_QUESTIONS:
      return _.merge(state, {
        questions: [],
      });
    case constants.actions.UPDATE_QUESTION:
      const updatedQuestions = _.map(state.questions, question => {
        if (question['_id'] === action.question['_id']) {
          return action.question;
        }
        return question;
      })
      return _.merge(state, {
        questions: updatedQuestions
      });
    default:
      return state;
  }
}
