const express = require('express')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

const app = require('./app')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
