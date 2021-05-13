const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')


const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')

require('./models/blog') 
require('./models/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/blog'))
app.use(require('./routes/user'))
app.use(cors())



mongoose.connect(MONGOURI
,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('connnected to mongo!!')
})

mongoose.connection.on('error',(err)=>{
    console.log('error : ',err)
})



app.listen(PORT,()=>{
    console.log('Server is up on,',PORT)
})