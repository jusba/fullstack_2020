import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer.js'
import thunk from 'redux-thunk'
const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)


export default store