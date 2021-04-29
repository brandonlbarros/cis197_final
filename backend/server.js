const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

const AccountRouter = require('./routes/account')
const FeedRouter = require('./routes/feed')

const app = express()
const MONGO_URI = 'mongodb://localhost:27017/finaltest2'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Do stuff here
app.use(express.static('dist'))
app.use(express.json())

app.use(cookieSession({
  name: 'session',
  keys: ['randomkeyhere'],
}))

app.use('/account', AccountRouter)
app.use('/feed', FeedRouter)

app.use((err, req, res, next) => {
  res.status(500).send(`${err}`)
})

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
    console.log('mongoDB is connected')
    console.log('listening on 3000')
})