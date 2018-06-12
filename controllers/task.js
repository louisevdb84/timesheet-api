const getTasks = (req, res, db) => {    
    db.select('*').from('tasks')
      .then(task => {
        if (task.length) {
          res.json(task)
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('error getting task'))
  }
  
  module.exports = {
    getTasks
  }