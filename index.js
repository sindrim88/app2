const express = require('express');
const axios = require('axios').default;
const app = express();
const path = require('path');
const orderRoutes = require('./routes/orders');
const customerRoutes = require('./routes/customer')

//method-override allows us to use a put and patch requests in HTML forms
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//EJS setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

// app.use( ( req, res, next) => {
//     next();
// })

app.use('/orders', orderRoutes);
app.use('/customer', customerRoutes);

app.get('/', (req, res) => {
    res.send("home");
    res
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
})