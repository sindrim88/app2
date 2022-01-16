const axios = require('axios').default;

module.exports.index = async(req, res) => {
    let orders2;
    await axios.get(`https://joroma.is/test/orders`)
        .then(response => {
        orders2 = response.data
    });
    res.render('orders/index', {orders2})
};

// render the order and all the products in the order
module.exports.showOrder = async(req, res) => {
    const { id } = req.params;

    let orders2;
    await axios.get(`https://joroma.is/test/orders`)
        .then(response => {
        orders2 = response.data
    });

    //find the order with the right id
    const order = orders2.find(order => order.id === parseInt(id));
    let products;
    await axios.get(`https://joroma.is/test/orders/${id}`)
        .then(response => {
        products = response.data
    });
    res.render('orders/show', {order, products});
};

//render the edit form
//app.get('/orders/:id/edit', async (req, res) => {
module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    let order;
    await axios.get(`https://joroma.is/test/orders/${id}`)
        .then(response => {
        order = response.data;
    });
    const price = order.products[0].price;
    const orderId = id;
    res.render('orders/edit', {orderId, price});
};



//update, patch request
module.exports.updateOrder = async(req, res) => {
    const { id } = req.params;
    const price  = req.body.price;

    let orders2;
    await axios.get(`https://joroma.is/test/orders`)
    .then(response => {
        orders2 = response.data
    });
    
    const order = orders2.find(order => order.id === parseInt(id));
    
    order.homeDelivery = false;
    let priceParsed = parseInt(price);
    //console.log(typeof priceParsed )
    
    // For now I'm only updating the price of the first item in the products array,
    // ideally would use an idx to keep track of which item(product) to update.
    // order.products[idx].price = priceParsed;
    order.products[0].price = priceParsed;
    
    axios.put(`https://joroma.is/test/orders/${id}`, order)
        .then((order)=> {
            console.log("Success", order.data)
        }).catch((err) => {
            console.log("Error", err)
        })
    // and of course the price changes back if the page is reloaded after this call..
    res.render('orders/show', {order});
};
