import anecdoteService from '../services/anecdotes'
import {setNotification} from '../reducers/notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
//const generateId = () =>
  //Number((Math.random() * 1000000).toFixed(0))

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const votedAnectode = state.find(a => a.id === id)
      const changedAnectode = {
        ...votedAnectode,
        votes: votedAnectode.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : changedAnectode
      )
    case 'NEW':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}
export const voteAnecdote = (object) => {
  return async dispatch => {
    const anecdote = await anecdoteService.update(object)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    
  }
}
export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
    dispatch(setNotification(`you added '${newAnecdote.content}'`, 10))
  }
}

export default reducer