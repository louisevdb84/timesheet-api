var Promise = require('bluebird');

var createData = function(db, data, tblName) {
    return db.transaction(trx=> {
        db(tblName).del()            
            .transacting(trx)
            .then(ids => {
            return Promise.map(data, d => {
                return db.insert(d)
                    .returning('*').into(tblName).transacting(trx);
            });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(inserts=> {
            console.log(inserts.length + ' new ' + tblName + ' saved.');
            console.log(inserts);
        })
        .catch(error=> {
        console.error(error);
        });  
    
}

var dropTables = (db) => {
    db.schema.dropTable('tasks')
        .then(res => {
            console.log("tasks")
            db.schema.dropTable('categories')
                .then(res => {
                    console.log("categories")
                    db.schema.dropTable('users')
                        .then(res => {
                            console.log("users")
                            db.schema.dropTable('projects')                                
                                .then(res => {
                                    console.log("projects")
                                    db.schema.dropTable('timesheetentries')
                                    .then(res => console.log("timesheetentries"))
                                })
                        })
                })
        })
}

var createTables = (db) => {
    var userPromise = new Promise((resolve, reject) => {
        db.schema.createTable('users', table => {
            table.increments();
            table.string('name');
            table.string('surname');
            table.decimal('hourlyRate'),
                table.string('username').unique().notNullable(),
                table.string('password').notNullable()
        }).then(res => {
            console.log("User created");
            resolve();
        });
    });

    userPromise.then(() => {
        db.schema.createTable('categories', table => {
            table.increments();
            table.integer('userId').references('id').inTable('users');
            table.string('name');
            table.bool('isActive');
        }).then(res => console.log("categories created"));
    })

    db.schema.createTable('tasks', table => {
        table.increments();
        table.integer('userId')//.references('id').inTable('users')
        table.integer('projectId')//.references('id').inTable('users')
        table.integer('categoryId')//.references('id').inTable('users')
        table.string('name')    
        table.integer('repeat')   
        table.bool('isActive')
    }).then(res => console.log("tasks created"))

    db.schema.createTable('projects', table => {
        table.increments();        
        table.string('name')            
    }).then(res => console.log("projects created"))

    
    db.schema.createTable('timesheetentries', table => {
        table.increments();        
        table.integer('taskId')//.references('id').inTable('users')        
        table.string('description')    
        table.dateTime('start')   
        table.dateTime('end')
    }).then(res => console.log("Timesheet Entries created"))
}

module.exports = {    
    createData: createData,   
    dropTables: dropTables,
    createTables: createTables
}