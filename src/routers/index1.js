const express=require('express')
//require('./db/mongoose')
const User=require('../models/user')
const userRouter=require('./user')

const app=express()
const port=process.env.PORT || 3000



app.use(express.json())
app.use(userRouter) //app.use(taskRouter)

const jwt=require('jsonwebtoken')

const myFunction = async() =>{
    const token= jwt.sign({_id:'abc123'},'thisisthekey',{expiresIn:'7 days'})
    console.log(token)
}


app.listen(port,()=>{
    console.log('Server is up on '+port)
})

myFunction()