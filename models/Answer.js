const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    required: true,
  },
})

const AnswerModel = mongoose.model('Answer', AnswerSchema)

module.exports = AnswerModel
