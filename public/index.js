var express = require("express")
const bodyParser = require("body-parser")
var mongoose = require("mongoose")
const { json } = require("body-parser")

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb');
var db = mongoose.connection;

db.on('error',()=>console.log("error"));
db.once('open',()=>console.log("connected"));


app.post("/", (req,res)=>{
    var emp= req.body.emp;
    var projects = req.body.projects;
    var daterange = req.body.daterange;
    var empb= req.body.empb;
    var backfills= req.body.backfills;
    var data={
        "emp": emp,
        "projects": projects,
        "daterange": daterange,
        "empb":empb,
        "backfills":backfills,
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    
    
    });
    return res.redirect('index.html')
  
})


app.get("/",(req,res)=>{
    res.set({
        "Allow=access-Allow-Origin": '*'
    })
    return res.redirect(index.html);
}).listen(3000);


console.log("listening to port 3000");


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { emp: "101" };

    dbo.collection("users").find( query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
