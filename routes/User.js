const express = require('express')
const UserModel = require('../models/User')

const router = express.Router()

router.post('/', async (req, res, next) => {
  const { name, user_type } = req.body
  const user = new UserModel({ name, user_type })

  try {
      const result = await user.save()
      res.json(result)
  } catch (error) {
      next(error)
  }
})

module.exports = router
