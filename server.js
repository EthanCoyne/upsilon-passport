var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./db/connection');
var path = require('path');
var login = require('./routes/login');
var register = require('./routes/register')
connection.connect();

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/login', login);
app.use('/register', register)

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
