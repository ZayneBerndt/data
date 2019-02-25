var function_module = require('./version.function.js')
module.exports = function(app) {
  app.get('/api/version', function(req, res, next) {
    function_module.function(req).then(result => {
      res.json(result)
    }).catch(error => {
      res.json(error)
    })
  })
}
