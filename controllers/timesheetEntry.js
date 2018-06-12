const getTimesheetEntries = (req, res, db) => {    
    db.select('*').from('timesheetentries')
      .then(timesheetEntry => {
        if (timesheetEntry.length) {
          res.json(timesheetEntry)
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('error getting timesheetEntry'))
  }
  
  module.exports = {
    getTimesheetEntries
  }