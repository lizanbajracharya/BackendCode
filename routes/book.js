const express = require('express');
const Book = require('../models/book');
const multer=require('multer')
const path=require("path");
const User=require('../models/user');
const router = express.Router();
const uploadRouter = express.Router();
const {ObjectID}  = require('mongodb');
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
        res.send(doc);
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
})

router.get('/favorite',auth.verifyUser,async(req, res)=>{
    var valid = mongoose.Types.ObjectId.isValid(req.user._id);
    if(valid){
    try {
        console.log(req.user._id)
        const book = await Book.find({userid: valid})
        res.send(post);
    }
    catch (e) {
        res.status(e).send()
    }
}
})


router.get('/search/:bookName', async (req, res) => {
    const searchName = req.params.bookName;
    console.log(searchName);
    try {
    const search = await Book.find({$text:{$search:searchName}})
    res.send(search);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/getByCategory/:id', async(req,res)=>{
    try{
        console.log("here")
        const id = req.params.id
        const data = await Book.find({Category:id})
        res.json(data);
    }
    catch(err){
        res.status(404).send(err);
    }
})


router.post('/users/:id', auth.verifyUser, async (req, res) => {
    const _id = req.params.id;
    
    const userid = req.user._id;

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    if (!ObjectID.isValid(userid)) {
        return res.status(404).send();
    }
    console.log(userid)

    try {
        Book.findByIdAndUpdate(_id,
            {$push: {userid: userid}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                    console.log(err);
                }else{
                    return res.status(200).send("Favorite added")
                }})}
    catch (error) {
        res.status(400).send(error)
    }
});
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
router.patch('/:bookId',upload.single('BookContent'),(req, res) => {
    Book.findOne({
        _id: req.params.bookId
    }).then((product) => {
        if (product) {
            return true;
        }
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Book.findOneAndUpdate({
                    _id: req.params.bookId
                }, {
                    $set: req.body,
                    BookContent:req.file.filename
                }
            ).then(() => {
                res.send({ message: 'product updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

router.patch('/user/:bookId',auth.verifyUser,upload.single('BookContent'),(req, res) => {
    Book.findOne({
        _id: req.params.bookId
    }).then((product) => {
        if (product) {
            return true;
        }
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Book.findOneAndUpdate({
                    _id: req.params.bookId
                }, {
                    $set: req.body,
                    userid:req.user._id
                }
            ).then(() => {
                res.send({ message: 'product updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});


router.delete('/deletebook/:id', function(req, res){
    Book.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })

module.exports=router;