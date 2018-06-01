var helper = require("./003-helper");
var users = require("./users");
var categories = require("./categories");
var tasks = require("./tasks");
var projects = require("./projects");
var timesheetEntries = require("./timesheetEntries");
Promise = require('bluebird');

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres_007',
        database: 'Timesheet'
    }
});

helper.createData(db, users, 'users')
    .then(helper.createData(db, categories, 'categories'))
    .then(helper.createData(db, projects, 'projects'))
    .then(helper.createData(db, tasks, 'tasks'))
    .then(helper.createData(db, timesheetEntries, 'timesheetentries'))
    //.then(process.exit())
