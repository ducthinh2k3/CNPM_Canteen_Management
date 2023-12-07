const multer  = require('multer')
const {
    addProduct,
    getProductPage,
    updateProduct,
    deleteProduct
} = require('../controller/product.controller');

const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './public/images/products')
    },
    filename(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.get('/product', getProductPage);
router.post('/product/add', upload.single('itemImage'), addProduct);
router.post('/product/update', upload.single('editItemImage') ,updateProduct);
router.get('/product/delete' ,deleteProduct);

module.exports = router;