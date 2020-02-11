const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../auth')
const jwtSecret="lizan";

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
            err.status = 500;
            return next(err);
        }
        User.create({
            mobileNumber: req.body.mobileNumber,
            Email:req.body.Email,
            username:req.body.username,
            password:hash
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, jwtSecret);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.get('/',(req,res)=>{
    User.find({
    }).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    })
});

router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id, 
        username: req.user.username, 
        password: req.user.password, mobileNumber: req.user.mobileNumber, Email: req.user.Email });
});

router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: req.user._id, 
                username: req.user.username, 
                password: req.user.password,
                mobileNumber: req.user.mobileNumber, 
                Email: req.user.Email});
        }).catch(next);
});

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not exist');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isCorrectPassowrd) => {
                        if (!isCorrectPassowrd) {
                            let err = new Error('Wrong Password');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, jwtSecret);
                        res.json({ userid:user._id,status: 'Login Successfully', token: token });
                    }).catch(next);
            }
        }).catch(next);
});

router.delete('/:id', function(req, res){
    User.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })

module.exports = router;
