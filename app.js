const express = require('express');
const app = express();
const {mongoose} = require('./db/db');
const bodyParser = require('body-parser');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require("path");

const port = 3000;
const saltRounds=10;
const jwtSecret = "0123456789abcdefghijklmnopqrstuvwxyz";

app.listen(port,()=>{
    console.log(`server is listening in port ${port}`);
});
