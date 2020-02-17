const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')





beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
    }

    await api
        .post('/api/users')
        .send(newUser)



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



    const newBlog = { title: "WOLOLOLO", author: "tsingis-kaani", url: "www.google.fi", likes: 100 }
    const user = await User.findOne({ username: 'mluukkai' })
    //jostain syystä onnistun rikkomaan kaiken jos siirrän tän tokenin generoinnin apufunktioksi
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    await api
        .post('/api/login')
        .send({ token, username: 'mluukkai', name: 'Matti Luukkainen' })


    const string = ("bearer " + token)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ 'Authorization': `${string}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const response = await api
        .get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(response.body.map(b => b.title)).toContain("WOLOLOLO")
})
test('blog gets a like value if not given', async () => {
    const newBlog = { title: "LOLOLOLO", author: "urjalan_prinssi", url: "www.fi" }

    const user = await User.findOne({ username: 'mluukkai' })
    //jostain syystä onnistun rikkomaan kaiken jos siirrän tän tokenin generoinnin apufunktioksi
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    await api
        .post('/api/login')
        .send({ token, username: 'mluukkai', name: 'Matti Luukkainen' })


    const string = ("bearer " + token)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ 'Authorization': `${string}` })
    const response = await api
        .get('/api/blogs')
    const addedBlog = response.body.find(b => b.title === "LOLOLOLO")
    expect(addedBlog.likes).toBe(0)
})

test('blogs cant be added without token', async () => {



    const newBlog = { title: "WOLOLOLO", author: "tsingis-kaani", url: "www.google.fi", likes: 100 }
    const user = await User.findOne({ username: 'mluukkai' })
    //jostain syystä onnistun rikkomaan kaiken jos siirrän tän tokenin generoinnin apufunktioksi
    

    

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)


    const response = await api
        .get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blogs cant be added without title or url', async () => {
    let newBlog = { author: "tsingis-kaani", url: "www.google.fi", likes: 100 }
    const user = await User.findOne({ username: 'mluukkai' })
    //jostain syystä onnistun rikkomaan kaiken jos siirrän tän tokenin generoinnin apufunktioksi
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    await api
        .post('/api/login')
        .send({ token, username: 'mluukkai', name: 'Matti Luukkainen' })


    const string = ("bearer " + token)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ 'Authorization': `${string}` })
        .expect(400)

    newBlog = { title: "jeejee", author: "tsingis-kaani", likes: 100 }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ 'Authorization': `${string}` })
        .expect(400)
    newBlog = { author: "tsingis-kaani", likes: 100 }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ 'Authorization': `${string}` })
        .expect(400)
})
test('blogs can be deleted', async () => {
    // aikaisemmissa osissa käytetty testaustapa kommentoitu
    /*const blogssAtStart = await helper.initialBlogs
    const blogToDelete = blogssAtStart[0]*/
    const newBlog = { title: "WOLOLOLO", author: "tsingis-kaani", url: "www.google.fi", likes: 100 }
    const user = await User.findOne({ username: 'mluukkai' })
    //jostain syystä onnistun rikkomaan kaiken jos siirrän tän tokenin generoinnin apufunktioksi
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    await api
        .post('/api/login')
        .send({ token, username: 'mluukkai', name: 'Matti Luukkainen' })

    const string = ("bearer " + token)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ 'Authorization': `${string}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)


    let response = await api
        .get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    oikeaId = response.body.filter(b => b.user != null)
    

    await api
        .delete(`/api/blogs/${oikeaId[0].id}`)
        .set({ 'Authorization': `${string}` })
        .expect(204)

    response = await api
        .get('/api/blogs')
    expect(response.body.length).toBe(
        helper.initialBlogs.length
    )

    /*expect(response.body.length).toBe(
        helper.initialBlogs.length - 1
    )*/
})
test('blogs can be modified', async () => {
    const blogsAtStart = await helper.initialBlogs
    const blogToChange = blogsAtStart[0]
    const newBlog = { title: "NEW", author: "NEWENWEN", url: "www.NEW.fi", likes: 3 }
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