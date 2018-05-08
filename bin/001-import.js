var mongoose = require("mongoose");
var helper = require("./003-helper");
const async = require('async');

var userData = require("./users");
var userModel = require("../models/user");
var taskData = require("./tasks");
var taskModel = require("../models/task");

var url = process.env.TimesheetDbDatabaseURL;
mongoose.connect(url);

async.parallel({
    user: async.apply(helper.create, userData, userModel),
    task: async.apply(helper.create,taskData, taskModel)
}, function (err, results) {
    if (err){
        console.log(err);
        throw err;
    }
    if (!results) {
        console.log("no results on import.")
    }
    console.log('import finished');
})