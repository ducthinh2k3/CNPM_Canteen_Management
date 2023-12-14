const {
    getMaterialPage,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getInventoryPage,
    updateQuantityMaterial
} = require('../controller/material.controller');

const express = require('express');
const router = express.Router();

// inventory
router.get('/inventory', getInventoryPage);

// material
router.get('/material', getMaterialPage);
router.post('/material/add', addMaterial);
router.post('/material/update', updateMaterial);
router.post('/material/update-quantity', updateQuantityMaterial);
router.get('/material/delete' ,deleteMaterial);

module.exports = router;