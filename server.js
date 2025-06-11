const express = require('express')
const cors = require('cors')

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

app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter)
app.use('/api/users', userRouter);  

//testing api

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the server!' })
})

//port

const PORT = process.env.PORT || 8080

//server

app.listen

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

