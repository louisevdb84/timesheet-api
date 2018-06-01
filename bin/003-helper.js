var Promise = require('bluebird');

var func = async function(db, data, tblName) {
    db.transaction(trx=> {
        db(tblName).del()            
            .transacting(trx)
            .then(ids => {
            return Promise.map(data, d => {
                return db.insert(d).into(tblName).transacting(trx);
            });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(inserts=> {
        console.log(inserts.length + ' new ' + tblName + ' saved.');
        })
        .catch(error=> {
        console.error(error);
        });  
    
}

var createData = async function (db, data, tblName) {
    return new Promise((res, rej) => {
        console.log("add data")
        //let r1 = await func(db, data, tblName)
        let r1 = func(db, data, tblName)
        
    })
    
}

var dropTables = (db) => {
    db.schema.dropTable('tasks').then(res => console.log(res)).catch(err => console.log(err));
    db.schema.dropTable('categories').then(res => console.log(res)).catch(err => console.log(err));
    db.schema.dropTable('users').then(res => console.log(res)).catch(err => console.log(err));
    db.schema.dropTable('projects').then(res => console.log(res)).catch(err => console.log(err));
    db.schema.dropTable('timesheetEntries').then(res => console.log(res)).catch(err => console.log(err));
}

var createTables = (db) => {
    db.schema.createTable('users', table => {
        table.increments();
        table.string('name');        
        table.string('surname');    
        table.decimal('hourlyRate'),
        table.string('username').unique().notNullable(),
        table.string('password').notNullable()             
    }).then(res => console.log)

    db.schema.createTable('categories', table => {
        table.increments();
        table.integer('userId')//.references('id').inTable('users')
        table.string('name')    
        table.bool('isActive')
    }).then(res => console.log)

    db.schema.createTable('tasks', table => {
        table.increments();
        table.integer('userId')//.references('id').inTable('users')
        table.integer('projectId')//.references('id').inTable('users')
        table.integer('categoryId')//.references('id').inTable('users')
        table.string('name')    
        table.integer('repeat')   
        table.bool('isActive')
    }).then(res => console.log)

    db.schema.createTable('projects', table => {
        table.increments();        
        table.string('name')            
    }).then(res => console.log)

    
    db.schema.createTable('timesheetentries', table => {
        table.increments();
        table.integer('userId')//.references('id').inTable('users')
        table.integer('taskId')//.references('id').inTable('users')        
        table.string('description')    
        table.dateTime('start')   
        table.dateTime('end')
    }).then(res => console.log)
}

module.exports = {    
    createData: createData,   
    dropTables: dropTables,
    createTables: createTables
}