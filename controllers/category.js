const getCategories = (req, res, db) => {    
    db.select('*').from('categories')
      .then(category => {
        if (category.length) {
          res.json(category)
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('error getting category'))
  }
  
  module.exports = {
    getCategories
  }