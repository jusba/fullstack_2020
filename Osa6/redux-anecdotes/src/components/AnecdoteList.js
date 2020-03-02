import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filtered_anecdotes = anecdotes.filter(ane => ane.content.toLowerCase().includes(filter.toLowerCase()))

    const vote = async (anecdote) => {
        dispatch(voteAnecdote(anecdote))  
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}

export default AnecdoteList