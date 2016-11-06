var express = require('express');
var bodyParser = require('body-parser')
var app     = express();
var path    = require('path');


app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.listen(8080);

console.log("Running at localhost:8080");
