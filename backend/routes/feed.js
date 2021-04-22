const express = require('express')
const Post = require('../models/post')

const router = express.Router()

router.get('/posts', async (req, res, next) => {

    try {
        Question.find({}, (err, posts) => {
            if (posts) {
              req.session.posts = posts
              res.send(posts)
            } else {
                next(new Error('No posts found'))
            }
          })
    } catch {
        next(new Error('Could not fetch posts'))
    }
})

router.post('/posts/add', async (req, res, next) => {
    const { title, articleText, author } = req.body
    const answer = ''

    try {
        await Post.create({ title, articleText, author })
        res.send('post is created')
    } catch {
        next(new Error('Could not create post'))
    }
  })

module.exports = router