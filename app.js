const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(borequire('./routes/speechToText')dyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(cors())
app.use(express.static('build'))
app.use('/speechtotext', );
app.use('/note', require('./routes/newnote'))
app.use('/viewsavednotes', require('./routes/savednotes'))
app.use('/login', require('./routes/login'))
app.use('/signup', require('./routes/signup'))
app.use('/profile', require('./routes/profile'))
app.get('/*',(req,res)=>{
  console.log("hello")
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
app.listen(3001)