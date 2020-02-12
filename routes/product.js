const express = require('express');
const Product = require('../models/product');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const uploadRouter = express.Router();
const mongoose=require('mongoose');
const auth='../auth.js';

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Product.findById(req.params.id).exec().then(doc=>{
        // doc.console
            res.send(doc.toJSON());
        }).catch((e)=>{
            res.send(e);
        })
})

//get all the products or items list
router.get('/', async(req, res) => {
    Product.find({}).then((productList)=>{
        res.send(productList);
    }).catch((e)=>{
        res.send(e);
    })
})


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
router.post('/',upload.single('productImage'),(req,res)=>{
   console.log(req.body)
    let newProduct = new Product({
        productName:req.body.productName,
        price:req.body.price,
        productImage:req.file.filename,
        Stock:req.body.Stock,
        Writer:req.body.Writer,
        productDescription:req.body.productDescription,
    });
    newProduct.save().then((productDoc)=>{
        res.send(productDoc)
    })
});

//get single products or items by id
router.patch('/:productId',upload.single('productImage'),(req, res) => {
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
                    $set: req.body,
                    productImage:req.file.filename
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