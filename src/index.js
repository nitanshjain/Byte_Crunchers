const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const userRouter=require('./routers/user')
const jwt=require('jsonwebtoken')
const db_connect=require('./db/mongoose')
const app=express()
const port=process.env.PORT || 3000

db_connect()

app.use(express.json())
app.use(userRouter)


app.listen(port,()=>{
    console.log('Server is up on '+port)
})