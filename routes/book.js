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


const storage = multer.diskStorage({
    destination: "./upload/productlist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

const storages = multer.diskStorage({
    destination: "./book/booklist",
    filenames: (req, file, callback) => {
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
    fileFilters: bookFileFilter
});

// uploadRouter.route('/upload')
//     .post(upload.single('imageFile'), (req, res) => {
//         res.json(req.file);
//     });


//post products or items
router.post('/savebook',upload.array('BookImage','BookContent',2),(req,res)=>{
    let newBook = new Book({
        BookName:req.body.BookName,
        BookWriter:req.body.BookWriter,
        BookImage:req.file.filename,
        BookContent:req.file.filename,
        Category:req.body.Category,
        isFavorite:req.body.isFavorite
    });
    newBook.save().then((bookDoc)=>{
        res.send(bookDoc);
    });
});

//get single products or items by id
router.put('/:id',upload.single('imageFile'),(req, res) => {
    Book.findOne({
        _id: req.params.id
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

router.put('/update/:id', async (req, res)=>{
    try{
        const data = await Book.findOneAndUpdate({_id:req.params.id},
            {
                $set: {
                    isFavorite:"1"
                }
            })
        res.json({data:data, result:true})
    }
    catch(err){
        res.json({message:err, result:false})
    }
})

router.put('/updates/:id', async (req, res)=>{
    try{
        const data = await Book.findOneAndUpdate({_id:req.params.id},
            {
                $set: {
                    isFavorite:"0"
                }
            })
        res.json({data:data, result:true})
    }
    catch(err){
        res.json({message:err, result:false})
    }
})
module.exports=router;