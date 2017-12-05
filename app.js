var express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request"),
    mongoose = require("mongoose"),
    app = express();

app.get("/", function(req, res){
    res.send("HOME PAGE!");
});

app.listen(3000, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("SERVER IS LISTENING!!!");
    }
});