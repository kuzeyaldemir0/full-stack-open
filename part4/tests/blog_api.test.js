const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('identifier property is named id', async () => {
  const response = await api.get('/api/blogs')

  const blogs = response.body
  blogs.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('add a new blog post', async () => {
  const newBlog = {
    title: "I'm a Kaggle Grandmaster!",
    author: "Rich Olson",
    url: "https://nothinglabs.com/im-a-kaggle-grandmaster/",
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const urls = response.body.map(b => b.url)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(urls.includes('https://nothinglabs.com/im-a-kaggle-grandmaster/'))
})

test('add a blog post without the likes field', async () => {
  const newBlog = {
    title: "I'm a Kaggle Grandmaster!",
    author: "Rich Olson",
    url: "https://nothinglabs.com/im-a-kaggle-grandmaster/"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('try to add a blog post without url', async () => {
  const blogWithoutUrl = {
    title: "I'm a Kaggle Grandmaster!",
    author: "Rich Olson",
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('try to add a blog post without title', async () => {
  const blogWithoutTitle = {
    url: "https://nothinglabs.com/im-a-kaggle-grandmaster/",
    author: "Rich Olson",
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

after (async () => {
  await mongoose.connection.close()
})