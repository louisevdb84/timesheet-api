var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    name: String,
    // user: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId, 
    //         ref: "User"
    //     },
    //     username: String
    // }
})

module.exports = mongoose.model("Task", taskSchema);