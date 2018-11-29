import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

let initialState = anecdotesAtStart.map(asObject)
initialState = []

const anecdoteReducer = (store = initialState, action) => {
  switch(action.type){

  case 'UPDATE': {
    const oldList = store.filter(a => a.id !== action.updatedAnecdote.id)
    return [...oldList, action.updatedAnecdote ]
  }

  case 'CREATE': {
    return [...store, { content: action.content, id: action.id, votes: action.votes }]
  }

  case 'INIT_ANECDOTES':{
    return action.anecdotes
  }

  default:
    return store
  }
}

export const castVote = (anecdote) => {
  return async (dispatch) => {
    const id = anecdote.id

    const updated = {
      content: anecdote.content,
      votes: anecdote.votes + 1,
    }

    const response = await anecdoteService.update(id, updated)

    dispatch({
      type: 'UPDATE',
      updatedAnecdote: response
    })
  }
}



export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      content: response.content,
      id: response.id,
      votes: response.votes
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes: anecdotes
    })
  }
}

export default anecdoteReducer
