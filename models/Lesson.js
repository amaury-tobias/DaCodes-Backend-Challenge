const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LessonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  approval_score: {
    type: Number,
    default: 60,
  },
  prev_lesson_id: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const LessonModel = mongoose.model('Lesson', LessonSchema)

module.exports = LessonModel
