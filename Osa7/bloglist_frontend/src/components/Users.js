import React from 'react'
import { useSelector } from 'react-redux'

const Button = ({ onClick, text }) => {

  return (
    <button onClick={onClick} >
      {text}
    </button>
  )
}

const Users = ({ handleLogout, user }) => {
  const blogs = useSelector(state => state.blogs)
  const users = [... new Set(blogs.map(x => x.user.username))]
  const updater = (u, blogs) => {

    return ({ username: u, blogs: blogs.filter(b => b.user.username === u) })
  }
  const blogUsers = users.map(u => updater(u, blogs))
  console.log(blogUsers)
  return (
    <div>
      <h2>blogs</h2>

      <h4>{user.name} logged in  </h4>
      <Button onClick={handleLogout} text={'logout'} />
      <h2>users</h2>
      <table>
        <tbody>
          <tr><th></th><th><h4>blogs created</h4></th></tr>
          {blogUsers.map(u => <tr key = {blogUsers.indexOf(u)}><td>{u.blogs[0].user.name}</td><td>{u.blogs.length}</td></tr>)}
        </tbody>

      </table>


    </div>
  )
}

export default Users