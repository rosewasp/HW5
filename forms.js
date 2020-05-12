var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 14987);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/get-display",function(req,res){
    var dataArray = [];
    for (var i in req.query){
        dataArray.push({"name":i, "value":req.query[i]})
    }
    var context = {};
    context.dataList = dataArray;
    res.render("getData", context);
});

app.post("/post-display",function(req,res){
    var dataArray = [];
    for (var i in req.body){
        dataArray.push({"name":i, "value":req.body[i]})
    }
    var context = {};
    context.dataList = dataArray;
    res.render("postData", context);
});

app.use(function(req,res){
    res.status(404);
    res.render("404");
});

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.type("plain/text");
    res.status(500);
    res.render("500");
});

app.listen(app.get("port"),function(){
    console.log("Express started on http://localhost:" + app.get("port") + ";press Ctrl-C to terminate.");
});