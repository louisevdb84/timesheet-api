const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');  
const app = express();

const project = require('./controllers/project');
const category = require('./controllers/category');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const task = require('./controllers/task');
const timesheetEntry = require('./controllers/timesheetEntry');

app.use(cors())
app.use(bodyParser.json());


const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres_007',
        database: 'Timesheet'
    }
});    

app.get("/", function(req, res){
    res.send("Hi!");
});

app.get('/category', (req, res) => { category.getCategories(req, res, db)})
app.get('/project', (req, res) => { project.getProjects(req, res, db) })
app.get('/register', (req, res) => { register.getRegister(req, res, db) })
app.get('/sigin', (req, res) => { sigin.getSignin(req, res, db) })
app.get('/task', (req, res) => { task.getTasks(req, res, db) })
app.get('/timesheetEntry', (req, res) => { timesheetEntry.getTimesheetEntries(req, res, db)})

app.listen(3001, function(){
    console.log("Server has started!!!");
});