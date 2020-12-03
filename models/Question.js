const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 1,
  },
  question_type: {
    type: String,
    enum: ['boolean', 'only_one', 'more_than_one', 'all_must_be'],
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    },
  ],
})

const QuestionModel = mongoose.model('Question', QuestionSchema)

module.exports = QuestionModel
