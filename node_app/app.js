const express = require("express");
const app = express();
module.exports = app;
const authmodule = require('./modules/authmodule.js')


app.get('/api/version', function(req, res) {
  authmodule.checkAuth(req.headers.token).then(function(userdata){
    //authed
    res.json({ version: '1.0' })
  }).catch(function(){
    //not authed
      res.json({ action: 'redirect=login' })
  })
})



app.post('/api/login', function(req, body, res) {
  //auth here

  var authToken = 'xasdsa-xsaxas-xsaxsa-xsaxas'
  res.json({ token: authToken })
})

app.listen(80)
