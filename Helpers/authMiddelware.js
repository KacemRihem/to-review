const jwt = require('jsonwebtoken');
require('dotenv').config;

const authMiddelware = (req, res, next)=>{
    let token = req.header('auth-token');
    if (!token){
        return res.status(401).json({msg: "You Are Not Authorized"})
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, payload)=>{
        if(err){
            throw err;
        };
        
        req.userId= payload.userId;
        req.userName= payload.userName;
        req.userEmail=payload.userEmail;
        req.userPassword=payload.userPassword;
        req.UserRole= payload.UserRole;

        next();
    });
}

module.exports = authMiddelware;