const express = require('express');
const Favorite = require('../models/favorite');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const User=require('../models/user');
const Book=require('../models/book');
const auth=require('../auth.js');

router.post('/',auth.verifyUser ,async (req,res)=>{
    const post = new Favorite({
        userid:req.user._id,
        bookid:req.body.bookid
    })
    // console.log(post)
    post.save().then((productDoc)=>{
        res.send(productDoc)
    })
});

router.get('/',  auth.verifyUser,async(req, res) => {
    Favorite.find({userid: req.user._id})
    .populate("bookid")
    .exec()
    .then((productList)=>{
        res.json(productList);
    }).catch((e)=>{
        res.send(e);
})
})

router.get('/all', auth.verifyUser, async (req, res) => {
    Favorite.findOne({
        userid: req.user._id
    }).then((product) => {
        if (product) {
            return true;
        }
        return false;
    }).
    then((canUploadImage) => {
        if (canUploadImage) {
            Book.find({}).then((productList)=>{
                res.send(productList);
            }).catch((e)=>{
                res.send(e);
            })
        } else {
            res.sendStatus(404);
        }
    })
});

router.delete('/:id', function(req, res){
    Favorite.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })

module.exports=router

