import React, { useState } from 'react'
import Notification from '../components/ErrorMessage'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog , onClickLike}) => {
  
  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  

  const [show, setShow] = useState(false)
  const onClick = (event) => {
    event.preventDefault()
    setShow(!show)
  }
  if (show) {
    console.log(blog)
    return (
      <div style = {blogStyle}>
      <p> {blog.title}   {blog.author} <Button onClick={onClick} text={"show"} /></p>
      <p>{blog.url}</p>
      <p>{blog.likes} <Button onClick = {onClickLike(blog)} text = {"Like"}/></p>
      <p>{blog.user.name}</p>
      </div>
    )
  }

  return (<div style = {blogStyle}> {blog.title}   {blog.author} <Button onClick={onClick} text={"show"}/> </div>)
}
const BlogList = ({ blogs,onClickLike }) => {


  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onClickLike = {onClickLike} />
      )}

    </div>
  )
}
const Button = ({ onClick, text }) => {

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
          value={newTitle}
          onChange={handleTitleAdd}
        />
      </div>
      <div>
        author: <input
          value={newAuthor}
          onChange={handleAuthorAdd}
        />
      </div>
      <div>
        url: <input
          value={newUrl}
          onChange={handleUrlAdd}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )
}

const BlogForm = ({ blogs, handleLogout, user, createBlog, newMessage, handleMessage, onClickLike }) => {
  const [newTitle, setTitle] = useState("")
  const [newAuthor, setAuthor] = useState("")
  const [newUrl, setUrl] = useState("")



  const addBlog = (event) => {
    event.preventDefault()
    try {
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      handleMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTitle("")
      setAuthor("")
      setUrl("")
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
      <h2>blogs</h2>
      <Notification message={newMessage} />
      <h3>{user.name} logged in  <Button onClick={handleLogout} text={"logout"} /> </h3>
      <Togglable buttonLabel="new blog">
        <CreateNew addBlog={addBlog} newTitle={newTitle} handleTitleAdd={handleTitleAdd} newAuthor={newAuthor} handleAuthorAdd={handleAuthorAdd} newUrl={newUrl} handleUrlAdd={handleUrlAdd} />
      </Togglable>
      <BlogList blogs={blogs} onClickLike = {onClickLike} />


    </div>
  )

}

export default BlogForm