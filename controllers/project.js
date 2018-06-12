const getProjects = (req, res, db) => {    
    db.select('*').from('projects')
      .then(project => {
        if (project.length) {
          res.json(project)
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('error getting project'))
  }
  
  module.exports = {
    getProjects
  }