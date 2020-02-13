const express = require('express');
const Category = require('../models/category');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const User=require('../models/user');
const Book=require('../models/book');
const auth=require('../auth.js');
const storage = multer.diskStorage({
    destination: "./category/categorylist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only pdf files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

router.post('/',upload.single('categoryimage'),async (req,res)=>{
    const post = new Category({
        categoryimage:req.file.filename,
        categoryname:req.body.categoryname
    })
    post.save().then((productDoc)=>{
        res.send(productDoc)
    })
});

router.get('/', async(req, res) => {
    Category.find({}).then((productList)=>{
        res.send(productList);
    }).catch((e)=>{
        res.send(e);
    })
})

router.delete('/:id', function(req, res){
    Category.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })

module.exports=router;