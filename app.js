'use strict'

const express = require('express')
const mongoose = require('mongoose')

const QuestionRouter = require('./routes/Question')
const LessonRouter = require('./routes/Lesson')
const CourseRouter = require('./routes/Course')
const UserRouter = require('./routes/User')

const debugMongo = require('debug')('server:mongo')

var dbURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/school'
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.set('debug', true)
mongoose.connection.on('error', (error) => debugMongo(error))

mongoose.connection.once('open', function () {
  debugMongo('Connected to DB')
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'hi' })
})

app.use('/user', UserRouter)
app.use('/question', QuestionRouter)
app.use('/lesson', LessonRouter)
app.use('/course', CourseRouter)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
    stack: err.stack,
  })
})

module.exports = app
