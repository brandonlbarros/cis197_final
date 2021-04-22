const express = require('express')
const Question = require('../models/question')

const router = express.Router()

router.get('/posts', async (req, res, next) => {

    try {
        Question.find({}, (err, qs) => {
            if (qs) {
              req.session.posts = qs
              res.send(qs)
            } else {
                next(new Error('No qs found'))
            }
          })
    } catch {
        next(new Error('Could not fetch qs'))
    }
})

router.post('/questions/add', async (req, res, next) => {
    const { questionText, author } = req.body
    const answer = ''

    try {
        await Question.create({ questionText, author, answer })
        res.send('q is created')
    } catch {
        next(new Error('Could not create q'))
    }
  })

router.post('/questions/answer', async (req, res) => {
    const { _id, answer } = req.body
  
    try {
      Question.findOneAndUpdate({ _id }, {answer: answer}, (err, q) => {
        if (q) {
          q.answer = answer
          res.send(q)
        } else {
          next(new Error('Could not find q to answer'))
        }
      })
    } catch {
        next(new Error('Could not answer q'))
    }
})

module.exports = router