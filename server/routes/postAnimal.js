var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var randomNumber = require('../routes/randomNumber');

var pg = require('pg');

var connectionString ='';

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.enn.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgress://localhost:5432/postgres';
}

router.post('/', function(req, res) {
    //console.log(req.body);
    var thisAnimalCount = randomNumber(1, 100);
    var addAnimal = {
        animalName: req.body.animalName,
        animalCount: thisAnimalCount
    };
    console.log(addAnimal.animalCount);
    pg.connect(connectionString, function (err, client, done) {
        client.query("INSERT INTO animals (animal_name, count) VALUES ($1, $2) RETURNING id",
            [addAnimal.animalName, addAnimal.animalCount],
            function (err, result) {
                done();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

module.exports = router;

