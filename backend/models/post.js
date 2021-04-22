const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title: {type: String, required: true },
  articleText: { type: String, required: true},
  author: { type: String, required: true },
  answer: { type: String },
  likes: { type: Number },
  comments: { type: [(String, String)]}
})

module.exports = model('Question', questionSchema)