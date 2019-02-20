const express = require('express'),
  app = express();

app.get('/api/version', function(req, res) {
  res.json({ version: '1.0' })
})

app.listen(80)