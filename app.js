const express = require('express');
const app = express();
const {mongoose} = require('./db/db');
const bodyParser = require('body-parser');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require("path");
const morgan=require('morgan');

const uploadRouter=require('./routes/upload');
const productRouter=require('./routes/product');
const userRouter=require('./routes/user');
const bookRouter=require('./routes/book');
const favoriteRouter=require('./routes/favorite');
const orderRouter=require('./routes/order');

const port = 3000;
const saltRounds=10;
const jwtSecret = "0123456789abcdefghijklmnopqrstuvwxyz";

app.use(morgan('dev'));

app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/upload',express.static(__dirname+'/upload/productlist'));
app.use('/load',express.static(__dirname+'/book/booklist/'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.urlencoded({extended:true}));


app.use('/product',productRouter);
app.use('/user',userRouter);
app.use('/book',bookRouter);
app.use('/uploadbook',uploadRouter);
app.use('/favorite',favoriteRouter);
app.use('/order',orderRouter);


app.use((req,res,next)=>{
  const error=new Error('Not Found');
  error.status=404;
  next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(port,()=>{
    console.log(`server is listening in port ${port}`);
});
