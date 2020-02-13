const express = require('express');
const Order = require('../models/order');
const multer=require('multer')
const path=require("path");
const auth=require ('../auth');
const router = express.Router();
const User=require('../models/user');

router.post('/',auth.verifyUser, async (req,res)=>{
    const post = new Order({
        userid:req.user._id,
        productname:req.body.productname,
        rate:req.body.rate,
        location:req.body.location,
        mobilenumber:req.body.mobilenumber
    })
    post.save().then((order)=>{
        res.send(order)
    })
});

router.get('/', auth.verifyUser,async (req,res)=>{
    Order.find({userid:req.user._id}).then((order)=>{
        res.send(order);
    }).catch((e)=>{
        res.send(e);
    })
});

module.exports=router;