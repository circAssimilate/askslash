export const ADD_TODO = 'ADD_TODO'
export const REPLACE_TODOS = 'REPLACE_TODOS'

export function addTodo(todo) {
  return { type: ADD_TODO, todo }
}

export function fetchTodos() {
  return dispatch => {
    axios
    	.get('https://jsonplaceholder.typicode.com/todos')
    	.then(response => {
    		dispatch({
          type: REPLACE_TODOS,
          list: response.data.map(todo => {
            return {
              title: todo.title,
              completed: false,
            }
          })
        })
    	})
    	.catch(error => {
        alert('There was an error fetching the list');
    		console.error('Error fetching list in handleListError', error);
    	});
  }
}

export function todoError() {
  return dispatch => {
    axios
    	.get('https://jsonplaceholder.typicode.com/todos0')
    	.then(response => {
    		dispatch({ type: REPLACE_TODOS, list: response.data })
    	})
    	.catch(error => {
        alert('There was an error fetching the list');
    		console.error('Error fetching list in handleListError', error);
    	});
  }
}

export function replaceTodos(list) {
  return { type: REPLACE_TODOS, list }
}
