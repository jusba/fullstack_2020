import React, { useState } from 'react'
import Notification from '../components/ErrorMessage'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import Blog from './Blog_component'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const jwt = require('jsonwebtoken')
require('dotenv')






const BlogList = ({ blogs, user, showBlogs }) => {

  blogs.sort((a, b) => (a.likes - b.likes))
  blogs.reverse()
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} showBlogs = {showBlogs} />
      )}

    </div>
  )
}
const Button = ({ onClick, text }) => {
  const buttonStyle = {
    border: 'none',
    color: 'red'
  }
  if (text === 'remove') {
    return (
      <button style={buttonStyle} onClick={onClick} >
        {text}
      </button>
    )
  }
  return (
    <button onClick={onClick} >
      {text}
    </button>
  )
}
const CreateNew = ({ addBlog, newTitle, handleTitleAdd, newAuthor, handleAuthorAdd, newUrl, handleUrlAdd }) => {
  
  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input
          id = 'title'
          value={newTitle}
          onChange={handleTitleAdd}
        />
      </div>
      <div>
        author: <input
          id = 'author'
          value={newAuthor}
          onChange={handleAuthorAdd}
        />
      </div>
      <div>
        url: <input
          id = 'url'
          value={newUrl}
          onChange={handleUrlAdd}
        />
      </div>
      <div>
        <button id="submit-button" type="submit">add</button>
      </div>
    </form>

  )
}

const BlogForm = ({ handleLogout, user, createBlog, newMessage, showBlogs }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  //jätin handlemessagen pois kun se on suurimman osan ajasta null, mutta välillä string joten sotkee asiat
  BlogForm.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    createBlog: PropTypes.func.isRequired,
    showBlogs: PropTypes.func.isRequired
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      createBlog(newBlog)
      
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log("error")
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
      <h2>blogs</h2>
      <Notification message={newMessage} />
      <h3>{user.name} logged in  <Button onClick={handleLogout} text={'logout'} /> </h3>
      <Togglable buttonLabel="new blog">
        <CreateNew addBlog={addBlog} newTitle={newTitle} handleTitleAdd={handleTitleAdd} newAuthor={newAuthor} handleAuthorAdd={handleAuthorAdd} newUrl={newUrl} handleUrlAdd={handleUrlAdd} />
      </Togglable>
      <BlogList blogs={blogs} user={user} showBlogs = {showBlogs}  />


    </div>
  )

}

export default  BlogForm