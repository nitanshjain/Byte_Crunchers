const express= require('express')
const connectDB = require('./config/db')
const path = require('path')
const app=express()
app.set('view engine','ejs')

app.use(express.static('public'));
app.use(express.json())

const PORT = process.env.PORT || 5501

connectDB()

app.use(express.json({ extended : false }))

app.get('/',(req,res)=>{
    res.send("API is running")
})

app.post('/user',require('./routes/user'))
app.get('/profile',require('./routes/profile'))
app.get('/auth',require('./routes/auth'))

app.listen(PORT,()=>{console.log('Server started on port '+PORT)})