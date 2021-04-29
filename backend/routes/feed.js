const express = require('express')
const Post = require('../models/post')

const router = express.Router()

router.get('/posts', async (req, res, next) => {

    try {
        Post.find({}, (err, posts) => {
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
    const likes = 0
    const comments = []

    try {
        await Post.create({ title, articleText, author, likes, comments })
        res.send('post is created')
    } catch {
        next(new Error('Could not create post'))
    }
})

router.post('/posts/delete', async (req, res, next) => {
  const { _id } = req.body

  try {
    Post.findOneAndDelete({ _id }, (err, p) => {
      if (p) {
        res.send(p)
      } else {
        next(new Error('Could not find q to answer'))
      }
    })
  } catch {
      next(new Error('Could not answer q'))
  }
})

router.post('/posts/like', async (req, res, next) => {
  const { _id, likes } = req.body

  try {
    Post.findOneAndUpdate({ _id }, {likes: likes+1}, (err, p) => {
      if (p) {
        p.likes++
        res.send(p)
      } else {
        next(new Error('Could not find q to answer'))
      }
    })
  } catch {
      next(new Error('Could not answer q'))
  }
})

router.post('/posts/comment', async (req, res, next) => {
  const { _id, comments, comment } = req.body
  comments.push(comment)
  try {
    Post.findOneAndUpdate({ _id }, {comments: comments}, (err, p) => {
      if (p) {
        p.comments.push(comment)
        res.send(p)
      } else {
        next(new Error('Could not find q to answer'))
      }
    })
  } catch {
      next(new Error('Could not answer q'))
  }
})

module.exports = router