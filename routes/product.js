const express = require('express');
const Product = require('../models/product');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const uploadRouter = express.Router();
const mongoose=require('mongoose')
router.get('/product/:id',(req,res,next)=>{
    Product.findById(id).exec().then(doc=>{
        console.log(doc)
        res.status(200).json({doc})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
})

//get all the products or items list
router.get('/list',(req,res)=>{
    Product.find({}).
    exec().then((productList)=>{
        res.send(productList);
    }).catch((e)=>{
        res.send(e);
    })
});

//path to store image
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

// uploadRouter.route('/upload')
//     .post(upload.single('imageFile'), (req, res) => {
//         res.json(req.file);
//     });


//post products or items
router.post('/save',upload.single('productImage'),(req,res)=>{
    let newProduct = new Product({
        _id:new mongoose.Types.ObjectId(),
        productName:req.body.productName,
        price:req.body.price,
        productImage:req.file.filename
    });
    newProduct.save().then((productDoc)=>{
        res.send(productDoc);
    }).catch(err =>console.log(err))
});

//get single products or items by id
router.patch('/product/:productId',upload.single('imageFile'),(req, res) => {
    Product.findOne({
        _id: req.params.productId
    }).then((product) => {
        if (product) {
            return true;
        }
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Product.findOneAndUpdate({
                    _id: req.params.productId
                }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'product updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

router.delete("/:productId",(req,res,next)=>{
    const id=req.params.productId;
    Product.remove({_id:id}).exec().then(result=>{
        res.status(200).json(res);
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
module.exports=router;
// module.exports=uploadRouter;