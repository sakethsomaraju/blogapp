const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId 

const userSchema = mongoose.Schema({
    username:{
        type:String, 
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{ 
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    checkBox:{
        type:Boolean,
        required:true
    },
    pic:{
        type:String,
        default:'https://res.cloudinary.com/blogsimagesaccount/image/upload/v1610867243/default-profile-picture_p1nqbe.png'
    },
    timeOfCreation:{
        type:Number,
        required:true
    },
    followers:[{type:ObjectId,ref:'User'}],
     following:[{type:ObjectId,ref:'User'}]
})

mongoose.model('User',userSchema)