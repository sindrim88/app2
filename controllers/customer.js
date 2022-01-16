const axios = require('axios').default;

module.exports.showCustomer = async (req,res) => {
    const { id } = req.params;
    let customer;

    await axios.get(`https://joroma.is/test/customers/${id}`)
        .then(response => {
            customer = response.data
            console.log(customer)
    });
    res.render('orders/customer', {customer})
};