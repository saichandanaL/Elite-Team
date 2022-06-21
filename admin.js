const mongoose = require('mongoose');
const express = require('express');
var faker  = require('faker');
var path   = require('path');
var dataModel = require('./models/data');
var XLSX = require('xlsx');
const { assert } = require('console');

//connect to db
mongoose.connect('mongodb://localhost:27017/mydb');
var db = mongoose.connection;

db.on('error',()=>console.log("error"));
db.once('open',()=>console.log("connected"));

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//set the static folder path
app.use(express.static(path.resolve(__dirname,'public')));

//default page
// app.get('/',(req,res)=>{
//     var resultArray = [];
//     let cursor = db.collection('users').find({});
//     cursor.forEach(function(doc,err){
//         resultArray.push(doc);
//     },function(){
//         db.close();
//         console.log("completed")
//         res.redirect('/')
//     })
// });
app.get('/data', function(req, res){
    res.send('hello world'); //replace with your data here
  });

//generate fake data using faker and save it in db


app.get('/info',(req,res)=>{
    var resultArray = [];
    let cursor = db.collection('users').find({});
    cursor.forEach(function(doc,err){
        resultArray.push(doc);
    },function(){
        db.close();
        console.log("completed")
        res.redirect('/')
    })
});

app.post('/exportdata',(req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
    dataModel.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/public/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
});

var port = 8000;
app.listen(port,()=>console.log('server run at '+port));

