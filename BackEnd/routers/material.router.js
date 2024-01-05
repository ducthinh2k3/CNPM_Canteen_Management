const multer  = require('multer')
const {
    getMaterialPage,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getInventoryPage,
    updateQuantityMaterialByProID,
    getMaterialSearchPage,
    searchByNameAndPaging,
    updateInventory
} = require('../controller/material.controller');

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

// inventory
router.get('/inventory', getInventoryPage);
router.get('/inventory/search', getMaterialSearchPage);
router.post('/inventory/update', updateInventory);

// material
router.get('/material', getMaterialPage);
router.get('/material/search', searchByNameAndPaging);
router.post('/material/add', upload.single('materialImage'), addMaterial);
router.post('/material/update',upload.single('editMaterialImage'), updateMaterial);
//router.post('/material/update-quantity', updateQuantityMaterial);
router.get('/material/delete' ,deleteMaterial);

module.exports = router; 
