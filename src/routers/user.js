const express = require('express')
const jwt=require('jsonwebtoken')
const router = new express.Router()
const auth=require('../middleware/auth')
const User=require('../models/user')

router.post('/users', async (req,res) => {
    const user = new User(req.body)

        try{
            const token = await user.generateAuthToken()
            await user.save()
            res.status(201).send({user,token})
        }catch(e) {
            res.status(400).send(e)
        }
})

router.post('/users/login', async (req,res)=>{
    try{
        const user= await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.patch('/users/me', auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','age','password']
    const isValidOperation=updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }

    try{
        updates.forEach((update) => req.user[update]= req.body[update])
        await req.user.save()
        //const user= await User.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators:true })// new:true will update the existing user with updated values and runValidation will ensure correct values are entered


        res.send(req.user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req,res)=>{
    try{
        // const user=await User.findByIdAndDelete(req.user._id)

        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)

    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me',auth, async (req,res)=>{
    res.send(req.user)
})

// router.get('/users/:id',async (req,res) => {
//     const _id=req.params.id

//     try {
//         const user=await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e){
//         res.status(500).send()
//     }

// })


router.post('/users/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })

        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})


router.post('/users/logoutAll',auth, async(req,res)=>{
    try{
        req.user.token=[]
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})

module.exports=router