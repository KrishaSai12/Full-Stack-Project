//creating express app

const express = require('express');
const app = express();  //getting an object
const products = require('./routes/product') ;//has the routes from the requests
const errorMiddleware = require('./middlewars/error');
const auth = require('./routes/auth')
const path = require('path')
const cookieParser = require('cookie-parser');
const order = require('./routes/order');
app.use(express.json());

//app.use(express.json()); // which accepts the json request 
app.use(cookieParser());// this middleware is used take cookies from the request when user login
app.use('/uploads',express.static(path.join(__dirname,'uploads ')))
app.use('/api/v1/',products) // middleware handles the products based routes
app.use('/api/v1/',auth) // middleware handles the user based routes
app.use('/api/v1',order)

app.use (errorMiddleware);



module.exports = app;