var helper = require("./003-helper");
var users = require("./users");
var categories = require("./categories");
var tasks = require("./tasks");
var projects = require("./projects");
var timesheetEntries = require("./timesheetEntries");

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres_007',
        database: 'Timesheet'
    }
});

var createDataConfig = [
    { data: users, tblName: 'users' },
    { data: categories, tblName: 'categories' },
    { data: projects, tblName: 'projects' },
    { data: tasks, tblName: 'tasks' },
    { data: timesheetEntries, tblName: 'timesheetentries' }
];

var creationPromise = Promise.resolve();
createDataConfig.forEach(dataConfig => {
    creationPromise = creationPromise.then(() => helper.createData(db, dataConfig.data, dataConfig.tblName));
});
creationPromise.then(() => process.exit());