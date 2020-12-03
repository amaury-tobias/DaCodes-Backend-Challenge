const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  prev_course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const CourseModel = mongoose.model('Course', CourseSchema)

module.exports = CourseModel
