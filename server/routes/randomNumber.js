var express = require('express');
var app = express();
//var router = express.Router();
//var bodyParser = require('body-parser');
var math = require('math');


function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}

module.exports = randomNumber;