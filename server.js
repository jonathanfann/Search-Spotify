var express = require('express');
var bodyParser = require('body-parser')
var app     = express();
var path    = require('path');


app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.listen(process.env.PORT || 8080, function () {
  console.log('runnin');
});
