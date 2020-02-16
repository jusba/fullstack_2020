const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate("user", {username:1, name:1, id:1})
  response.json(blogs)

})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})
  const id = Math.floor(Math.random() * Math.floor(users.length))
  const user = await User.findById(users[id]._id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: users[id]._id
  })
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).json(result)
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title, author: request.body.author, url: request.body.url, likes: request.body.likes
    }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.json(updatedBlog.toJSON())
})

module.exports = blogRouter