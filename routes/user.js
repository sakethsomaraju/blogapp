const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const User = mongoose.model('User')
const Blog = mongoose.model('Blog')

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
        .select('-password')
        .then(user => {
            Blog.find({postedBy:req.params.id})
           .populate('postedBy','_id name')
            .then((posts,err)=>{
                if(err){
                    res.status(404).json({error:'user not found'})
                }
                res.json({user,posts})
            })
            .catch(err => console.log(err))
        })
})

router.put('/updateProfilePic',requireLogin,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{$set:{pic:req.body.pic}},{new:true},(err,result)=>{
        if(err){
            res.status(422).json({error:'pic cannot be posted'})
        }
        res.status(200).json(result)
    }).catch(e =>console.log(e))
})


module.exports = router