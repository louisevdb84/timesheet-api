var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require('cors');
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User = require("./models/user")

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres_007',
        database: 'Timesheet'
    }
});

// db('users').insert({
//     id: 1,
//     username: "Louise",
//     password: "123"
// }).then(console.log)

db.select('*').from('users').then(data => {
    console.log(data);
});
    
    //https://www.npmjs.com/package/passport-local-postgres

//var url = process.env.TimesheetDbDatabaseURL;
//mongoose.connect(url);

// app.use(require("express-session")({
//     secret: "timesheet app",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.send("Hi!");
});



app.listen(3000, function(){
    console.log("Server has started!!!");
});