import * as todoActions from '../actions/todos'

export default (state=[], action) => {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return [
        ...state,
        {
          userId: action.todo.userId,
          id: action.todo.id,
          title: action.todo.title,
          completed: false
        }
      ]
    case todoActions.REPLACE_TODOS:
      return action.list
    default:
      return state
  }
}
