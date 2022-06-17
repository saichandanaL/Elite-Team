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

app.get('/info', function(req, res){
  res.status(200).json({info : 'preset text'})
//  res.sendFile("index.html"); 
});

app.post('/',(req,res)=>{
    const parcel = req.body;
    console.log(parcel);
    if(!parcel){
        res.status(400).send({status : "invalid request"});
        return;
    }
    res.status(200).send({status:'received'})
})
// mongoose.connect('mongodb://localhost:27017/mydb');
// var db = mongoose.connection;

// db.on('error',()=>console.log("error"));
// db.once('open',()=>console.log("connected"));


// app.post("/", (req,res)=>{
//     var emp= req.body.emp;
//     var projects = req.body.projects;
//     var daterange = req.body.daterange;
//     var empb= req.body.empb;
//     var backfills= req.body.backfills;
//     var data={
//         "emp": emp,
//         "projects": projects,
//         "daterange": daterange,
//         "empb":empb,
//         "backfills":backfills,
//     }
//     db.collection('users').insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log(chalk.red("record inserted"));
    
//     });
//     return res.redirect('index.html')
// })
app.listen(port);
