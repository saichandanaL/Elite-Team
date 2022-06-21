const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
var mongoose = require("mongoose");


const port = 8000;

app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.json());

app.get('/info', function (req, res) {
    res.status(200);
    res.sendFile("../admin.js");
});

mongoose.connect('mongodb://localhost:27017/mydb');
var db = mongoose.connection;

db.on('error', () => console.log("error"));
db.once('open', () => console.log("connected"));

app.get('/data', function (req, res) {
    // res.send('hello world'); //replace with your data here
    var resultArray = [];
    let cursor = db.collection('users').find({});
    cursor.forEach(function (doc, err) {
        resultArray.push(doc);
    }, function () {
        // db.close();
        console.log("completed" + resultArray);
        res.send(resultArray);
    })
});
app.post('/api', (req, res) => {
    const parcel = req.body;
    console.log("got in app.js " + parcel['parcel']);
    if (!parcel) {
        res.status(400).send({ status: "invalid request" });
        return;
    }
    res.status(200).send({ status: 'received' });

    Array.from(parcel['parcel'], child => {
        // console.log(child);
        db.collection('users').insertOne(child, (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("record inserted");
        });
    });

});


app.listen(port);

