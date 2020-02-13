const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const jwtSecret = "0123456789abcdefghijklmnopqrstuvwxyz";
const UserSchema=new mongoose.Schema({
    mobileNumber:{
        type:Number,
        required:true,
        minlength:10,
        index:true,
        unique:true,
        trim:true
    },
    password:{
        type: String,
        required: true,
        minLength:5,
        trim: true
    },
    Email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});
UserSchema.path('username').index({text: true});
const User=mongoose.model('User',UserSchema);
module.exports=User;