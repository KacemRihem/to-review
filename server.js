const express = require ('express');
const ConnectDB = require('./Helpers/connectDB');

const app = express();

//connect to db
ConnectDB();

//middleware
app.use(express.json());

//Define Routes
app.use("/register", require('./Routes/register'));
app.use("/login", require('./Routes/login'));
app.use("/post", require('./Routes/post'));

const PORT = process.env.PORT  || 5000;
app.listen(PORT, ()=> console.log (`Server is running on PORT: ${PORT}`));