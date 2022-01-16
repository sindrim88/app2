const express = require('express');
const router = express.Router();
const customers = require('../controllers/customer');

router.route('/:id')
    .get(customers.showCustomer)
    
module.exports = router;