const express = require('express');
const Favorite = require('../models/favorite');
const multer=require('multer')
const path=require("path");
const router = express.Router();

router.post('/save', async (req,res)=>{
    const post = new Favorite({
        userid:req.body.userid,
        bookid:req.body.bookid
    })
    // console.log(post)
    post.save().then((productDoc)=>{
        res.send(productDoc)
    })
});

router.get('/', async (req,res)=>{
    try{
        const data = await Favorite.find({})
        res.json({data:data,message:true})
    }
    catch(err){
        res.json({message:false, error:err})
    }
});

module.exports=router

