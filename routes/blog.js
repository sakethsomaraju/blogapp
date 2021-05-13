const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const Blog = mongoose.model('Blog')
const User = mongoose.model('User')

router.post('/create',requireLogin,(req,res)=>{

    const { title,description,body,postedOn } = req.body
    const {username,pic} = req.user

    // console.log(title,description,body,postedOn)

    if (!title || !description || !body || !postedOn){
        res.status(422).json({error:'Please add all fields'})
    }
    const blog = new Blog({
        title,
        description,
        body,
        postedOn,
        postedBy:req.user,
        postedByUsername:username,
        postedByPic:pic
    })
    blog.save()
        .then(result => res.status(201).json({blog:result}))
        .catch(err => console.log(error))
})

router.put('/updateBlog',requireLogin,(req,res)=>{
    const { _id,title,description,body,postedOn } = req.body
    const {username,pic} = req.user
    if (!title || !description || !body || !postedOn){
        res.status(422).json({error:'Please add all fields'})
    }
     Blog.findByIdAndUpdate(_id,{_id,title,description,body,postedOn,postedByUsername:username,postedByPic:pic,postedBy:req.user},{new:true},
        (err,result)=>{
            if(err){
                res.status(422).json({error:'some error'})
            }
            res.status(200).json({blog:result})
        }) 
   
        
})

router.get('/blogs/:page',requireLogin,async (req,res)=>{
    const itemsPerPage = 7
    const page = req.params.page || 1
    const offset = (page*itemsPerPage) - itemsPerPage
    try{
        const blogs = await Blog.find().skip(offset).limit(itemsPerPage)
        res.send(blogs)
    }catch(err){
        console.log(err)
    } 
})



module.exports = router