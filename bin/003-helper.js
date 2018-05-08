var mongoose = require("mongoose");

var data = [];
var model = {};

function create(d, m) {    
    data = d;
    model = m;
    model.remove({}, cb)
}

function cb(err) {
    if (err) {
        console.log(err);
    }
    console.log("removed");
    console.log(data);

    data.forEach(item => {
        model.create(item, (err, object) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Added"+ object);
            }
        })
    })
}

module.exports = {
    create
}
