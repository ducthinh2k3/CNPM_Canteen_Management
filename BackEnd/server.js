require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs/promises')
const port = process.env.PORT || 3000;
const session = require('express-session')
// set dir
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
})); */
// middleware
app.use(cors())

//template engine and view engine

// router
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
const authRouter = require('./routers/auth.router');
const kitchenRouter = require('./routers/kitchen.router');

// use router
app.use('/api/admin', userRouter);
app.use('/api/admin', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/shop', kitchenRouter);

app.use((err, req, res, next) => {
    console.log(err.stack);
    const statusCode = 500;
    res.status(statusCode).send(err.message);

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})