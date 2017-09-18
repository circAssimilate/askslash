import axios from 'axios'
import constants from './constants'

/*
 * Questions actions
 */
export function createQuestion(question) {
  return dispatch => {
    axios
    	.post(`/api/v1/questions`, question)
    	.then(response => {
        dispatch({
          type: constants.actions.CREATE_QUESTION,
          question: response.data,
        })
    	})
    	.catch(error => {
    		console.error('Error fetching questions in handleListError', error);
    	});
  }
}

export function fetchQuestions(meetingId) {
  return dispatch => {
    axios
    	.get(`/api/v1/questions/${meetingId}`)
    	.then(response => {
    		dispatch({
          type: constants.actions.FETCH_QUESTIONS,
          questions: response.data.questions,
        })
    	})
    	.catch(error => {
    		console.error('Error fetching questions in handleListError', error);
    	});
  }
}

export function updateQuestion(questionId, instruction) {
  return dispatch => {
    axios
    	.put(`/api/v1/questions/${questionId}/${instruction}`)
    	.then(response => {
    		dispatch({
          type: constants.actions.UPDATE_QUESTION,
          question: response.data
        })
    	})
    	.catch(error => {
    		console.error('Error fetching questions in handleListError', error);
    	});
  }
}

/*
 * Meeting actions
 */
 export function createMeeting(meeting) {
   return dispatch => {
     axios
     	.post(`/api/v1/meetings`, meeting)
     	.then(response => {
     		dispatch({
           type: constants.actions.CREATE_MEETING,
           meeting: response.data,
         })
     	})
     	.catch(error => {
     		console.error('Error fetching questions in handleListError', error);
     	});
   }
 }

 export function deleteMeeting(meetingId) {
   return dispatch => {
     axios
     	.delete(`/api/v1/meetings/${meetingId}`)
     	.then(response => {
     		dispatch({
           type: constants.actions.DELETE_MEETING,
           meetingId,
         });
     	})
     	.catch(error => {
     		console.error('Error fetching questions in handleListError', error);
     	});
   }
 }

 export function fetchMeetings() {
   return dispatch => {
     axios
     	.get('/api/v1/meetings')
     	.then(response => {
     		dispatch({
           type: constants.actions.FETCH_MEETINGS,
           meetings: response.data.meetings,
         })
     	})
     	.catch(error => {
     		console.error('Error fetching questions in handleListError', error);
     	});
   }
 }

 export function setMeeting(meetingId) {
   return dispatch => {
     dispatch({
       type: constants.actions.SET_MEETING,
       meetingId,
     })
   }
 }

export function updateMeetingQuestions(meetingId, instruction) {
  return dispatch => {
    axios
    	.put(`/api/v1/meetings/${meetingId}/${instruction}`)
    	.then(response => {
    		dispatch({
          type: constants.actions.UPDATE_MEETING_QUESTIONS,
        })
    	})
    	.catch(error => {
    		console.error('Error fetching questions in handleListError', error);
    	});
  }
}

export default {
  createMeeting,
  deleteMeeting,
  createQuestion,
  fetchMeetings,
  fetchQuestions,
  setMeeting,
  updateMeetingQuestions,
  updateQuestion,
}
