const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

//Databse Connection
dbConnect()

const app = express();

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

//Start server
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server Running on Port ${PORT}`);
})