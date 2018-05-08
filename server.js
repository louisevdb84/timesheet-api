var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user")

var url = process.env.TimesheetDbDatabaseURL;
mongoose.connect(url);

app.use(require("express-session")({
    secret: "timesheet app",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.send("Hi!");
});



app.listen(3000, function(){
    console.log("Server has started!!!");
});