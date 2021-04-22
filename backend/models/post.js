const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title: {type: String, required: true },
  articleText: { type: String, required: true},
  author: { type: String, required: true },
  likes: { type: Number },
  comments: { type: [(String)]}
})

module.exports = model('Question', questionSchema)