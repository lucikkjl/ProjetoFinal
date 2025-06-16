const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');
const swaggerDocs = require('./docs/swagger');

const categoryRouter = require('./routes/categoryRouter.js');
const orderRouter = require('./routes/orderRouter.js'); 
const productRouter = require('./routes/productRouter.js')
const userRouter = require('./routes/userRouter.js');
const orderItemsRouter = require('./routes/orderItemsRouter.js');

const app = express()

const port = process.env.PORT || 8080;

var corsOptions = {
  origin: 'http://localhost:3000'
}

//middleware

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter)
app.use('/api/users', userRouter);  
app.use('/api/orderItems', orderItemsRouter);

swaggerDocs(app)

//testing api

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the server!' })
})

//server

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized successfully.')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to synchronize database:', err);
  });


