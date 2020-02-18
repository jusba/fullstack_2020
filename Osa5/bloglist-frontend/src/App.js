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
  const [userBlogs, setUserBlogs] = useState(null)

  const setUBlogs = (user) =>{
    
    const blogList = blogs.filter(b=>  b.user.username === "jammu")
    return(blogList)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ),
      setUserBlogs(setUBlogs)
    )  
  }, [])

  

  const handleLogin = async (event) => {
    
    event.preventDefault()
    try {
      console.log("try")
      const user = await loginService.login({
        username, password,
      })
      
      
      setUser(user)
      setUBlogs(user)
      
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("catch")
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  
  return (
    <div>
     
    {user === null && <LoginForm handleLogin = {handleLogin} setUsername = {setUsername} setPassword = {setPassword} username = {username} password = {password}/>}
      {user !== null && <BlogForm blogs = {blogs} user = {user} />}
     
   
      
    </div>
  )
}

export default App