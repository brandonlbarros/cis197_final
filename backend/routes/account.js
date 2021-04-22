const express = require('express')
const User = require('../models/user')

const router = express.Router()


router.post('/signup', async (req, res) => {
    const { username, password, admin } = req.body

    try {
        await User.create({ username, password, admin })
        res.send('user is created')
    } catch {
        next(new Error('Login failed'))
    }
})

router.get('/check', async (req, res) => {
  res.send(req.session)
})

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
  
    try {
      User.findOne({ username, password }, (err, user) => {
        if (user) {
          req.session.username = username
          req.session.password = password
          res.send('logged in')
        } else {
          next(new Error('Login failed'))
        }
      })
    } catch {
        next(new Error('error on login'))
    }
  })

router.post('/logout', async (req, res) => {
    req.session.username = null
    req.session.password = null
    req.session.admin = false
    res.send('user logged out')
})

module.exports = router