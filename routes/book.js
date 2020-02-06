const express = require('express');
const Book = require('../models/book');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const uploadRouter = express.Router();

router.get('/:id',(req,res,next)=>{
    Book.findById(req.params.id).exec().then(doc=>{
        console.log(doc)
        res.status(200).json({doc})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
})
//get all the products or items list
router.get('/', async(req, res) => {
    try{
        const data = await Book.find({})
        res.json({data:data,message:true})
    }
    catch(err){
        res.json({message:false, error:err})
    }
})


//post products or items
router.post('/savebook',(req,res)=>{
    let newBook = new Book({
        BookName:req.body.BookName,
        BookWriter:req.body.BookWriter,
        BookImage:req.body.BookImage,
        BookContent:req.body.BookContent,
        Category:req.body.Category,
        isFavorite:req.body.isFavorite
    });
    newBook.save().then((bookDoc)=>{
        res.send(bookDoc);
    });
});

//get single products or items by id
router.put('/:id',((req, res, next) => {
    Book.findOneAndUpdate({_id: req.params.id }, { $set: req.body }, { new: true })
        .then((reply) => {
            if (reply == null) throw new Error("Task not found!");
            res.json(reply);
        }).catch(next);
}));
router.delete('/deletebook/:id', function(req, res){
    Book.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })

module.exports=router;