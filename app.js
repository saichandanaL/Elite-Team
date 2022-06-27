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

mongoose.connect('mongodb+srv://jasmine:password11@cluster0.nlkkq.mongodb.net/test');
var db = mongoose.connection;

db.on('error', () => console.log("error"));
db.once('open', () => console.log("connected"));

app.get('/data', function (req, res) {

    var resultArray = [];
    let cursor = db.collection('users').find({});
    cursor.forEach(function (doc, err) {
        resultArray.push(doc);
    }, function () {
        
        console.log("completed" + resultArray);
        res.send(resultArray);
    })
});


app.get('/Billabledata', function (req, res) {
    
    var resultArray = [];
    let cursor = db.collection('Billable').find({});
    cursor.forEach(function (doc, err) {
        resultArray.push(doc);
    }, function () {
        
        console.log("completed" + resultArray);
        res.send(resultArray);
    })
});


app.get('/dataOfProject/:emp', function (req, res) {
   
    const emp = req.params.emp;
    var resultArray = [];
    var query = {"emp" : emp};
    let cursor = db.collection('users').find(query);
    cursor.forEach(function (doc, err) {
        resultArray.push(doc["projects"]);
    }, function () {
      
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
        
        db.collection('users').insertOne(child, (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("record inserted");
        });
    });

});


app.post('/submitBillableData', (req, res) => {
    const parcel = req.body;
    console.log("got in app.js " + parcel);
    if (!parcel) {
        res.status(400).send({ status: "invalid request" });
        return;
    }
    res.status(200).send({ status: 'received' });

    
    db.collection('Billable').insertOne(parcel['fullData'], (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("record inserted");
        });
    });



app.listen(port);

