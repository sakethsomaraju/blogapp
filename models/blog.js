const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId 

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    postedByUsername:{
        type:String,
        required:true
    },
    postedByPic:{
        type:String,
        required:true
    },
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:'User'}}],
    postedBy:{
        type:ObjectId,
        ref:'User'
    },
    
    claps:[{
        type:ObjectId,
        ref:'User'
    }],
    postedOn:{
        type:Number
    }
})

mongoose.model('Blog',blogSchema)