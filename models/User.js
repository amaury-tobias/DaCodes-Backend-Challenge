const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
    enum: ['professor', 'student'],
  },
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
