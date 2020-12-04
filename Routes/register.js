const express = require ('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require ("../models/userSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

//Register user

router.post("/",[
    body("firstname").isAlpha(),
    body("lastname").isAlpha(),
    body("email").isEmail(),
    body("phone").isNumeric(),
    body("password", "Minimum length allowed is 8 character").isLength({min : 8})
], (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    // const newUser = new User (req.body)
    // newUser.save()
    // res.send(newUser)
    User.find({email: req.body.email})
        .then(users=>{
            if(users.length){
                return res
                .status(400)
                .send({errors:[{msg: "User already exists!"}]})
            }
            let newUser = new User (req.body);
            bcrypt.genSalt(10, (err, Salt)=>{
                if(err){
                    throw err
                }
                bcrypt.hash(req.body.password, Salt, (err, hashedPwd)=>{
                    if(err){
                        throw err;
                    }
                    newUser.password = hashedPwd;
                    newUser.save();

                    let payload = {
                        userId: newUser._id,
                        userName: newUser.firstname,
                        userEmail: newUser.email,
                        userPassword: newUser.password,
                        UserRole: newUser.role
                    }
                    jwt.sign(payload, process.env.SECRET_KEY, (err, token)=>{
                        if(err){
                            throw err;
                        }
                        res.send({ token });
                    });
                });
            });
        });
    });
module.exports = router;