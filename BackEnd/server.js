require ('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs/promises')
const port = process.env.PORT || 3000;
// set dir
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// middleware
app.use(cors())

//template engine and view engine

// router
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
const materialRouter = require('./routers/material.router');
const wareHouseRouter = require('./routers/warehouse.router');
const DashboardRouter = require('./routers/dashboard.router');
const couponRouter = require('./routers/coupon.router');
const orderRouter = require('./routers/order.router');
const reviewRouter = require('./routers/review.router');

// use router
app.use('/api/admin', userRouter);
app.use('/api/admin', productRouter);
app.use('/api/admin', materialRouter);
app.use('/api/admin', wareHouseRouter);
app.use('/api/admin', DashboardRouter);
app.use('/api/shop', reviewRouter);
app.use('/api/admin', couponRouter);
app.use('/api/admin', orderRouter);
app.use('/api/admin', reviewRouter);


app.use((err, req, res, next ) => {
    console.log(err.stack);
    const statusCode = 500;
    res.status(statusCode).send(err.message);
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
