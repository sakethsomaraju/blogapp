const express = require('express')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User  = mongoose.model('User')
const {JWT_SECRET} =  require('../config/keys')

const router = express.Router()

router.post('/signup',(req,res)=>{
    const {email,password,mobile,username,check,pic,timeOfCreation} = req.body
    if(!email || !password || !mobile){
       return res.status(422).json('Please upload all fields')
    }
    User.findOne({email,mobile})
        .then(savedUser => {
            if(savedUser){
                return res.status(422).json({error:'User with provided email and mobile is already present'})
            }
            bycrypt.hash(password,8) 
            .then(hashedPassword => {
                const user = new User({
                    email,
                    password:hashedPassword,
                    username,
                    mobile,
                    checkBox:check,
                    pic,
                    timeOfCreation 
                    
                })
                user.save()
                    .then(user => res.json({message:"Signup Successful !!!"}))
                    .catch(err => console.log(err))
            })
        })

        .catch(err => console.log(err))
})

router.post('/signin', (req,res)=>{
    const {email,password,mobile} =  req.body
    if(!email || !password || !mobile){
        return res.status(400).send('Enter all fields')
    }
    User.findOne({email,mobile})
        .then(savedUser => { 
            if(!savedUser){
                return res.status(422).json({err:'Invalid Email or mobile or password'})
            }
            bycrypt.compare(password,savedUser.password)
                .then(doMatch =>{
                    if(doMatch){
                       const token =  jwt.sign({_id:savedUser._id},JWT_SECRET)
                        const {_id,username,email,pic,followers,following} = savedUser
                        res.json({token,user:{_id,username,email,pic,followers,following}})
                    }
                    else{
                        res.status(422).json({err:'Invalid Email or mobile or password'})
                    }
                })
        })
})

module.exports = router