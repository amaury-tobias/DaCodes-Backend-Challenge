const express = require('express')
const CourseModel = require('../models/Course')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await CourseModel.find({})
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { name } = req.body
  const course = new CourseModel({
    name,
  })
  try {
    const result = await course.save()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:course_id', async (req, res, next) => {
  const { course_id } = req.params
  try {
    const result = await CourseModel.findById(course_id)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:course_id', async (req, res, next) => {
  const { course_id } = req.params
  const { name } = req.body
  try {
    const result = await CourseModel.findByIdAndUpdate(course_id, { name })
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:course_id', async (req, res, next) => {
  const { course_id } = req.params
  try {
    const result = await CourseModel.findByIdAndDelete(course_id)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:course_id/lessons', async (req, res, next) => {
  const { course_id } = req.params
  try {
    const result = await CourseModel.findById(course_id)
      .populate({
        path: 'lessons',
      })
      .exec()
    res.json(result.lessons)
  } catch (error) {
    next(error)
  }
})

router.get('/:course_id/lessons/:lesson_id', async (req, res, next) => {
  const { course_id, lesson_id } = req.params
  try {
    const result = await CourseModel.findById(course_id)
    result.lessons.push(lesson_id)
    const saveResult = await result.save()
    res.json(saveResult)
  } catch (error) {
    next(error)
  }
})

router.get('/:course_id/users', async (req, res, next) => {
  const { course_id } = req.params
  try {
    const result = await CourseModel.findById(course_id)
      .populate({
        path: 'users',
      })
      .exec()
    res.json(result.users)
  } catch (error) {
    next(error)
  }
})

router.get('/:course_id/users/:user_id', async (req, res, next) => {
  const { course_id, user_id } = req.params
  try {
    const result = await CourseModel.findById(course_id)
    result.users.push(user_id)
    const saveResult = await result.save()
    res.json(saveResult)
  } catch (error) {
    next(error)
  }
})

router.get('/:course_id/prev-course', async (req, res, next) => {
  const { course_id } = req.params
  try {
    const result = await CourseModel.findById(course_id).populate('prev_course_id').exec()

    res.json(result.prev_course_id)
  } catch (error) {
    next(error)
  }
})

router.get('/:course_id/prev-course/:prev_course_id', async (req, res, next) => {
  const { course_id, prev_course_id } = req.params
  try {
    const result = await CourseModel.findByIdAndUpdate(course_id, { prev_course_id })

    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:course_id/all', async (req, res, next) => {
  const { course_id } = req.params
  try {
    const result = await CourseModel.findById(course_id)
      .populate({
        path: 'prev_course_id',
      })
      .populate({
        path: 'lessons',
      })
      .populate({
        path: 'users',
        select: 'name',
      })
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
