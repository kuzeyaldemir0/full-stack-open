const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

const app = express()

logger.info(`Connecting to MongoDB`)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(() => {
    logger.error('error while connecting to MongoDB', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
