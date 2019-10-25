const express = require('express');

var app = express();

app.get('/', (req, res) => {
    console.log('received a GET request!');
    res.send('connected');
})

app.listen(5000);