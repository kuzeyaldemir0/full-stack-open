const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.title && body.url) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined
        ? 0
        : body.likes
    })
    
    const savedBlog = await blog.save()
    return response.status(201).json(savedBlog)
  }
  return response.status(400).json({ error: 'title or url missing' })
})

module.exports = blogRouter