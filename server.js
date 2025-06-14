const express = require('express')
const cors = require('cors')
const User = require('./models/userModel.js') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config();

const secret = process.env.JWT_SECRET;
const port = process.env.PORT || 8080; 


const app = express()

var corsOptions = {
  origin: 'http://localhost:3000'
}

//middleware

app.use(cors(corsOptions))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//routes

const categoryRouter = require('./routes/categoryRouter.js');
const orderRouter = require('./routes/orderRouter.js'); 
const productRouter = require('./routes/productRouter.js')
const userRouter = require('./routes/userRouter.js');
const orderItemsRouter = require('./routes/orderItemsRouter.js');

app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter)
app.use('/api/users', userRouter);  
app.use('/api/orderItems', orderItemsRouter);

//testing api

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the server!' })
})

//server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


