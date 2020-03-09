import React, { useState } from 'react'
import Notification from '../components/ErrorMessage'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import Blog from './Blog_component'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Marquee from 'react-double-marquee'
import styled from 'styled-components'


//const jwt = require('jsonwebtoken')
require('dotenv')


const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`



const BlogList = ({ blogs, user }) => {

  blogs.sort((a, b) => (a.likes - b.likes))
  blogs.reverse()
  return (
    
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}  />
      )}

    </div>
  )
}
/*const Button = ({ onClick, text }) => {
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
}*/
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

const BlogForm = ({ handleLogout, user, createBlog, newMessage }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const blogs = useSelector(state => state.blogs)
  //jätin handlemessagen pois kun se on suurimman osan ajasta null, mutta välillä string joten sotkee asiat
  BlogForm.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    createBlog: PropTypes.func.isRequired

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
      console.log('error')
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
    
    <div style= {{
      width: '500px',
      whiteSpace: 'nowrap',
    }} >
      <Marquee>
      BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP  BLOG APP 
      </Marquee>
      <Notification message={newMessage} />
      <Togglable buttonLabel="new blog">
        <CreateNew addBlog={addBlog} newTitle={newTitle} handleTitleAdd={handleTitleAdd} newAuthor={newAuthor} handleAuthorAdd={handleAuthorAdd} newUrl={newUrl} handleUrlAdd={handleUrlAdd} />
      </Togglable>
      <Page>
      <BlogList blogs={blogs} user={user}  />
      </Page>

    </div>
  )

}

export default  BlogForm