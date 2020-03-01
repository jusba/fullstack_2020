import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {voteNotification, clear} from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filtered_anecdotes = anecdotes.filter(ane => ane.content.toLowerCase().includes(filter.toLowerCase()))

    const vote = (id, content) => {
        dispatch(voteAnecdote(id))  
        dispatch(voteNotification(content))
        setTimeout(() => {
          dispatch(clear())  
        }, 5000)
      }
    return(
    <div>
    {filtered_anecdotes.sort((a,b) => (b.votes - a.votes)).map(anecdote =>
        <div key={anecdotes.indexOf(anecdote)}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}

export default AnecdoteList