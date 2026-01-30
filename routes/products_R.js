const express = require('express');
const router = express.Router();
const {
    getAllProducts,
   
    
} =  require('../controller/products_C');

router.get('/',getAllProducts);

module.exports = router;