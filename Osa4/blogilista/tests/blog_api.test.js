const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json and the right amount is returned', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('identifier field is id', async () => {
    const response = await api
        .get('/api/blogs')
    response.body.forEach(i => expect(i.id).toBeDefined())
})

test('blogs can be added and they are right type/substance', async () => {
    const newBlog = {title: "WOLOLOLO", author: "tsingis-kaani", url: "www.google.fi", likes: 100}
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    
    const response = await api
        .get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length+ 1)
    expect(response.body.map(b => b.title)).toContain("WOLOLOLO")
})
test('blog gets a like value if not given', async () => {
    const newBlog = {title: "LOLOLOLO", author: "urjalan_prinssi", url: "www.fi"}
    await api
        .post('/api/blogs')
        .send(newBlog)
    const response = await api
        .get('/api/blogs')   
    const addedBlog = response.body.find(b => b.title === "LOLOLOLO") 
    expect(addedBlog.likes).toBe(0)
})

test('blogs cant be added without title or url', async () => {
    let newBlog = {author: "tsingis-kaani", url: "www.google.fi", likes: 100}
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    newBlog = {title: "jeejee", author: "tsingis-kaani",likes: 100}
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    newBlog = {author: "tsingis-kaani",likes: 100}
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})
test('blogs can be deleted', async () => {
    const blogssAtStart = await helper.initialBlogs
    const blogToDelete = blogssAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

    const response = await api
    .get('/api/blogs')

    expect(response.body.length).toBe(
      helper.initialBlogs.length - 1
    )
})
test('blogs can be modified', async () => {
    const blogsAtStart = await helper.initialBlogs
    const blogToChange = blogsAtStart[0]
    const newBlog = {title: "NEW", author: "NEWENWEN", url: "www.NEW.fi", likes: 3}
    await api
      .put(`/api/blogs/${blogToChange._id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
    const right = await response.body.find(b => b.title === "NEW")
    expect(right.title).toContain("NEW")
    })

afterAll(() => {
    mongoose.connection.close()
}) 