import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

//const reducer = anecdoteReducer

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
  })

const store = createStore(
    reducer,
    composeWithDevTools()
  )

export default store