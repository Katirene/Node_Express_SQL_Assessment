var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var postAnimal = require('./routes/postAnimal');
var getAnimal = require('./routes/getAnimal');


app.use(bodyParser.urlencoded({expanded: true}));

app.set('port', process.env.PORT || 3000);

app.use('/postAnimal', postAnimal);

app.use('/getAnimal', getAnimal);

app.get('/*', function(req, res) {
    console.log("Here is the request: " , req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

app.listen(app.get('port'), function() {
    console.log('Server is ready on port  ' + app.get('port'));
});