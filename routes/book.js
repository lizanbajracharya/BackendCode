const express = require('express');
const Book = require('../models/book');
const multer=require('multer')
const path=require("path");
const User=require('../models/user');
const router = express.Router();
const uploadRouter = express.Router();
const auth = require('../auth');
const storage = multer.diskStorage({
    destination: "./book/booklist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error("You can upload only pdf files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

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
    Book.find({}).then((productList)=>{
        res.send(productList);
    }).catch((e)=>{
        res.send(e);
    })
})


//post products or items
router.post('/',upload.single('BookContent'),(req,res)=>{
    let newBook = new Book({ ...req.body, BookContent: req.file.filename, 
    });
    newBook.save().then((bookDoc)=>{
        res.send(bookDoc);
    });
});
// 
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