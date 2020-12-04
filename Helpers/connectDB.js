const mongoose = require ('mongoose');
require('dotenv').config();

const ConnectDB = () =>{
    mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    ,(err)=>{
        if (err){
            throw err;
        }
        console.log("DataBase Connected...")
    });
};

module.exports = ConnectDB;