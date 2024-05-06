const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const excerciseRouter = require('./routes/excercise')
const usersRouter = require('./routes/users')
const resultRouter = require('./routes/result')
const { logger } = require('./middleware/logEvents')
const  errorHandler  = require('./middleware/errorHandler')


require('dotenv').config()
const app = express()   
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const uri = process.env.ATLAS_URI
mongoose.connect(uri)

const connection = mongoose.connection
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully")
})


app.use('/excercises', excerciseRouter)
app.use('/users', usersRouter)
app.use('/results', resultRouter)

app.use(logger)
app.use(errorHandler);

app.listen(port, ()=> {
    console.log('listening on port', port)
})