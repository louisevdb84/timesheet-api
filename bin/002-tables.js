var helper = require("./003-helper");
var users = require("./users");
var categories = require("./categories");

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres_007',
        database: 'Timesheet'
    }
});
helper.dropTables(db)
setTimeout(() => {
    helper.createTables(db);
}, 5000);
setTimeout(() => {
    process.exit();
}, 8000);


