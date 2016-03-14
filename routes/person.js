var mongoose = require('mongoose');
var express = require('express');
require('../models');


var router = express.Router();
var PersonSchema = mongoose.schemas.Person;
var Person = mongoose.model('person', PersonSchema);

/* GET users listing. */
router.get('/', function (req, res, next) {     
  Person.find({},function (err, result) { 
    if (err) {
        return next(err);
    }
    res.status(200).send(result);          
  });


  router.post('/', function (req, res, next) {
    var body = req.body;
    var person = new Person(body);
    console.log(body);      
      person.save(function (err, result) {
        if (err) {
            return next(err);
        }
        res.status(200).send(result);          
        });
  });


  router.patch('/', function (req, res, next) {
    console.log(req.body);
    var body = req.body;
    var id = req.body._id;
    delete body._id;
  
         
      Person.findByIdAndUpdate(id, body, function (err, result) {
        if (err) {
            return next(err);
        }
        res.status(200).send(result);          
        });
  });


  router.delete('/', function (req, res, next) {
    var body = req.body.id;
    console.log(body);     
      Persone.findByIdAndRemove(body, function (err, result) {
        if (err) {
            return next(err);
        }

        res.status(200).send(result);          
      });
        
  });

});


  
module.exports = router;
