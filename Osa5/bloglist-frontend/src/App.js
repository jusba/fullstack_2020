import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import LoginForm from './components/Login'
import BlogForm from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setTitle] = useState("")
  const [newAuthor, setAuthor] = useState("")
  const [newUrl, setUrl] = useState("")
  const [newMessage, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs),
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const handleMessage = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }



  const handleLogout = async (event) => {
    console.log("logout")
    event.preventDefault()
    try {
      setUser(null)
      window.localStorage.clear()
      blogService.setToken(null)
      console.log("logout successfull")
    } catch (exception) {
      console.log("logout failed")
    }
  }

  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      console.log("try")
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      handleMessage('succesfully logged in')  
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("catch")
      handleMessage('wrong credentials')
      setUsername('')
      setPassword('')

    }
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      const newBlog = await blogService.create(blog)
      handleMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
        
      blogService.getAll().then(blogs =>
        setBlogs(blogs),
      )
    } catch (exception) {
      handleMessage('failed to create message')  
    }
    

  }
  const handleTitleAdd = (event) => {
    setTitle(event.target.value)

  }
  const handleAuthorAdd = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlAdd = (event) => {
    setUrl(event.target.value)
  }


  return (
    <div>

      {user === null && <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} newMessage={newMessage} />}
      {user !== null && <BlogForm blogs={blogs} handleLogout={handleLogout} user={user} addBlog={addBlog} newTitle={newTitle} handleTitleAdd={handleTitleAdd} newAuthor={newAuthor} handleAuthorAdd={handleAuthorAdd} newUrl={newUrl} handleUrlAdd={handleUrlAdd} newMessage={newMessage} />}



    </div>
  )
}


export default App