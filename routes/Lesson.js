const express = require('express')
const LessonModel = require('../models/Lesson')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await LessonModel.find({})
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { name, approval_score } = req.body
  const lesson = new LessonModel({
    name,
    approval_score,
  })
  try {
    const result = await lesson.save()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:lesson_id', async (req, res, next) => {
  const { lesson_id } = req.params
  try {
    const result = await LessonModel.findById(lesson_id)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:lesson_id', async (req, res, next) => {
  const { lesson_id } = req.params
  const { name, approval_score } = req.body

  try {
    const result = await LessonModel.findByIdAndUpdate(lesson_id, {
      name,
      approval_score,
    })
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:lesson_id', async (req, res, next) => {
  const { lesson_id } = req.params
  try {
    const result = await LessonModel.findByIdAndDelete(lesson_id)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:lesson_id/question', async (req, res, next) => {
  const { lesson_id } = req.params
  try {
    const result = await LessonModel.findById(lesson_id)
      .populate({
        path: 'question',
        populate: { path: 'answers' },
      })
      .exec()
    res.json(result.question)
  } catch (error) {
    next(error)
  }
})

router.get('/:lesson_id/question/:question_id', async (req, res, next) => {
  const { lesson_id, question_id } = req.params
  try {
    const result = await LessonModel.findByIdAndUpdate(lesson_id, { question: question_id })

    res.json(result.question)
  } catch (error) {
    next(error)
  }
})

router.get('/:lesson_id/prev-lesson', async (req, res, next) => {
  const { lesson_id } = req.params
  try {
    const result = await LessonModel.findById(lesson_id).populate('prev_lesson_id').exec()

    res.json(result.prev_lesson_id)
  } catch (error) {
    next(error)
  }
})

router.get('/:lesson_id/prev-lesson/:prev_lesson_id', async (req, res, next) => {
  const { lesson_id, prev_lesson_id } = req.params
  try {
    const result = await LessonModel.findByIdAndUpdate(lesson_id, { prev_lesson_id })

    res.json(result.question)
  } catch (error) {
    next(error)
  }
})

router.get('/:lesson_id/all', async (req, res, next) => {
  const { lesson_id } = req.params
  try {
    const result = await LessonModel.findById(lesson_id)
      .populate({
        path: 'question',
        populate: { path: 'answers' },
      })
      .populate({
        path: 'prev_lesson_id',
        populate: {
          path: 'question',
          populate: { path: 'answers' },
        },
      })
      .populate({
        path: 'users',
        select: 'name',
      })
      .exec()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:lesson_id/users', async (req, res, next) => {
  const { lesson_id } = req.params

  try {
    const result = await LessonModel.findById(lesson_id).populate('users').exec()

    res.json(result.users)
  } catch (error) {
    next(error)
  }
})

router.put('/:lesson_id/users/:user_id', async (req, res, next) => {
  const { lesson_id, user_id } = req.params

  try {
    const result = await LessonModel.findById(lesson_id)
    result.users.push(user_id)
    const saveResult = await result.save()

    res.json(saveResult)
  } catch (error) {
    next(error)
  }
})

module.exports = router
