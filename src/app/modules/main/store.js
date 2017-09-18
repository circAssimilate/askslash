import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

// modules
import ask from 'app/modules/ask/reducers'

const middleware = applyMiddleware(promise(), thunk, createLogger());
const combinedReducers = combineReducers({
  ask,
});

const initialState = {
  ask: {
    questions: [],
    meetings: [],
  },
};

export default createStore(
  combinedReducers,
  initialState,
  middleware
);
