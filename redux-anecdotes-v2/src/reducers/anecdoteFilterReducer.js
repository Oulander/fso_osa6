const initialState = ''

const anecdoteFilterReducer = (store = initialState, action) => {
  switch (action.type) {
  case 'SETANECDOTE': {
    return action.text
  }
  default: return store
  }
}

export const setAnecdoteFilter = (text) => {
  return {
    type: 'SETANECDOTE',
    text
  }
}

export default anecdoteFilterReducer
