const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title: {type: String, required: true },
  articleText: { type: String, required: true},
  author: { type: String, required: true },
  likes: { type: Number },
  comments: { type: [(String)]}
})

module.exports = model('Post', postSchema)