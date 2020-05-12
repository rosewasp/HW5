// using express module to create express application
var express = require("express");

var app = express();

// set main.handlebars as the default layout
var handlebars = require("express-handlebars").create({defaultLayout:"main"});

// bodyParser used to parse POST data
var bodyParser = require("body-parser");

// bodyParser handles query and body of POST data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handlebar.engine handles everything with .handlebars extension
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// set the port number for the URL
app.set("port", 14987);

// renders the home.handlebars file at the homepage
app.get("/",function(req,res){
    res.render("home");
});

// iterates through each key:value in query and adds to an array
app.get("/get-display",function(req,res){
    var dataArray = [];
    for (var i in req.query){
        dataArray.push({"name":i, "value":req.query[i]})
    }
    var context = {};
    context.dataList = dataArray;
    // replaces dataList in getData.handlebars
    res.render("getData", context);
});

// iterates through each key:value in query and body of POST data
app.post("/post-display",function(req,res){
    var dataArray = [];
    // iterates through query of POST data
    for (var i in req.query){
        dataArray.push({"name":i, "value":req.query[i]})
    }
    for (var i in req.body){
        dataArray.push({"name":i, "value":req.body[i]})
    }
    var context = {};
    context.dataList = dataArray;
    // replaces dataList in postData.handlebars
    res.render("postData", context);
});

// displays error when desired page is not in server
app.use(function(req,res){
    res.status(404);
    res.render("404");
});

// handles syntax and technical errors
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.type("plain/text");
    res.status(500);
    res.render("500");
});

// starts the web page and displays the port where it is available
app.listen(app.get("port"),function(){
    console.log("Express started on http://localhost:" + app.get("port") + ";press Ctrl-C to terminate.");
});