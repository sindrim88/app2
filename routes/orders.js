const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');

router.route('/')
    .get(orders.index)

router.route('/:id')
    .get(orders.showOrder)
    .patch(orders.updateOrder)

//  Here would be a good place to add middleware,
//  add functionality that checks if the user has permission to change the data
//  for example: 
//  const {isLoggedIn, hasPermission} = require('../middleware');

//  router.get('/:id/edit',isLoggedIn, hasPermnission, orders.renderEditForm);

router.get('/:id/edit', orders.renderEditForm);

module.exports = router;