const express = require('express')
const QuestionModel = require('../models/Question')
const AnswerModel = require('../models/Answer')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await QuestionModel.find({})
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { text, detail, score, question_type } = req.body
  const newQuestion = new QuestionModel({
    text,
    detail,
    score,
    question_type,
  })
  try {
    const result = await newQuestion.save()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:question_id', async (req, res, next) => {
  const { question_id } = req.params
  try {
    const result = await QuestionModel.findById(question_id)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:question_id', async (req, res, next) => {
  const { question_id } = req.params
  const { text, detail, score, question_type } = req.body

  try {
    const result = await QuestionModel.findByIdAndUpdate(question_id, {
      text,
      detail,
      score,
      question_type,
    })
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:question_id', async (req, res, next) => {
  const { question_id } = req.params
  try {
    const result = await QuestionModel.findByIdAndDelete(question_id)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:question_id/answers', async (req, res, next) => {
  const { question_id } = req.params
  try {
    const result = await QuestionModel.findById(question_id).populate('answers').exec()
    res.json(result.answers)
  } catch (error) {
    next(error)
  }
})

router.post('/:question_id/answers', async (req, res, next) => {
  const { question_id } = req.params
  const { text, correct } = req.body

  try {
    const question = await QuestionModel.findById(question_id)

    const answer = new AnswerModel({ text, correct })
    const answerResult = await answer.save()

    question.answers.push(answerResult.id)

    const result = await question.save()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:question_id/answers/:answer_id', async (req, res, next) => {
  const { question_id, answer_id } = req.params
  try {
    const result = await QuestionModel.findById(question_id).populate('answers').exec()

    res.json(result.answers.filter((el) => el._id == answer_id))
  } catch (error) {
    next(error)
  }
})

router.put('/:question_id/answers/:answer_id', async (req, res, next) => {
  const { question_id, answer_id } = req.params
  const { text, correct } = req.body
  try {
    const question = await QuestionModel.findById(question_id).populate('answers').exec()
    const answer = question.answers.filter((el) => el._id == answer_id)[0]
    answer.text = text
    answer.correct = correct
    const result = await answer.save()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:question_id/answers/:answer_id', async (req, res, next) => {
  const { question_id, answer_id } = req.params
  try {
    const question = await QuestionModel.findById(question_id).populate('answers').exec()
    const result = await question.answers.filter((el) => el._id == answer_id)[0].remove()

    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
