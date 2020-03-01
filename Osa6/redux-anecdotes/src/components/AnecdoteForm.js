import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, clear} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event)=> {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(addAnecdote(newAnecdote.content))
        dispatch(addNotification(newAnecdote.content))
        setTimeout(() => {
          dispatch(clear())  
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm