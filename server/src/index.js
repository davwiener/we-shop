const express = require('express');
const mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb+srv://snir:' + process.env.MONGO_ATLAS_PW + '@mongodb-we-shop-lvfok.mongodb.net/test?retryWrites=true&w=majority', {
    useMongoClient: true
});

app.use(require('./routes'));

app.listen(5000);
