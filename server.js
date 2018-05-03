var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

var url = "mongodb://louise:timesheet@ds111410.mlab.com:11410/timesheet";
mongoose.connect(url);

app.get("/", function(req, res){
    res.send("Hi!");
});

app.listen(3000, function(){
    console.log("Server has started!!!");
});