import React from 'react'
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

const BlogForm = ({blogs, user}) => {
  
  return(
  <div>
      <h2>blogs</h2>
      <h3>{user.name} logged in </h3>
      
      <BlogList blogs = {blogs}/>
      
      
    </div>  
  )

}

export default BlogForm