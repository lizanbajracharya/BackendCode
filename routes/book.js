const express = require('express');
const Book = require('../models/book');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const uploadRouter = express.Router();

//get all the products or items list
router.get('/listbook',(req,res)=>{
    Book.find({}).then((booklist)=>{
        res.send(booklist);
    }).catch((e)=>{
        res.send(e);
    })
});

const storage = multer.diskStorage({
    destination: "./upload/productlist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});
//path to store image
const storages = multer.diskStorage({
    destination: "./book/booklist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const bookFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error("You can upload only pdf files!"), false);
    }
    cb(null, true);
};
const uploads = multer({
    storages: storages,
    fileFilter: bookFileFilter
});

uploadRouter.route('/upload')
    .post(upload.single('imageFile'), (req, res) => {
        res.json(req.file);
    });


//post products or items
router.post('/savebook',upload.single('BookImage'),uploads.single('BookContent'),(req,res)=>{
    let newBook = new Book({
        BookName:req.body.BookName,
        BookWriter:req.body.BookWriter,
        BookImage:req.file.filename,
        BookContent:req.file.filename
    });
    newBook.save().then((bookDoc)=>{
        res.send(bookDoc);
    });
});

//get single products or items by id
router.patch('/book/:bookid',upload.single('imageFile'),(req, res) => {
    Book.findOne({
        _id: req.params.productId
    }).then((book) => {
        if (book) {
            return true;
        }
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Book.findOneAndUpdate({
                    _id: req.params.bookid
                }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'book updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});
router.delete('/deletebook/:id', function(req, res){
    //console.log(req.params.id);
    Book.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })
module.exports=router;