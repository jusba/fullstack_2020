import React from 'react'
import Notification from '../components/ErrorMessage'

const Blog = ({blog}) => {
  return <p> {blog.title}   {blog.author}</p>
}
const BlogList = ({blogs}) => {
  

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}
const Button = ({onClick}) => {
  
  return (
      <button onClick={onClick} >
      Logout
      </button>
  )
}
const CreateNew = ({addBlog, newTitle ,handleTitleAdd ,newAuthor, handleAuthorAdd, newUrl, handleUrlAdd }) =>{
  
  return(
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

const BlogForm = ({blogs, user, handleLogout, addBlog, newTitle ,handleTitleAdd ,newAuthor, handleAuthorAdd, newUrl, handleUrlAdd, newMessage }) => {
 
  return(
  <div>
      <h2>blogs</h2>
      <Notification message= {newMessage}/>
      <h3>{user.name} logged in  <Button onClick = {handleLogout}/> </h3>
      <CreateNew addBlog = {addBlog} newTitle = {newTitle} handleTitleAdd = {handleTitleAdd} newAuthor = {newAuthor} handleAuthorAdd = {handleAuthorAdd} newUrl ={newUrl} handleUrlAdd = {handleUrlAdd}/>
      <BlogList blogs = {blogs}/>
      
      
    </div>  
  )

}

export default BlogForm