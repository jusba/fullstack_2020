import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { addBlog } from './reducers/blogReducer'
import blogService from './services/blogs'
import loginService from './services/logins'
import LoginForm from './components/Login'
import BlogForm from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])




  const handleLogout = async (event) => {
    console.log('logout')
    event.preventDefault()
    try {
      setUser(null)
      window.localStorage.clear()
      blogService.setToken(null)
      console.log('logout successfull')
    } catch (exception) {
      console.log('logout failed')
    }
  }

  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      console.log('try')
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setNotification(`succesfully logged in`, 5))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('catch')
      dispatch(setNotification(`failed to log in`, 5))
      setUsername('')
      setPassword('')

    }
  }
  const blogAdd = (blogObject) => {
    
    dispatch(addBlog(blogObject))
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))

  }




  return (
    <div>

      {user === null && <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />}
      {user !== null && <BlogForm handleLogout={handleLogout} user={user} createBlog={blogAdd}  />}



    </div>
  )
}


export default App