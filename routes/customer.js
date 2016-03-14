var mongoose = require('mongoose');
var express = require('express');
require('../models');


var router = express.Router();
var CustomerSchema = mongoose.schemas.Customer;
var Customer = mongoose.model('customer', CustomerSchema);

/* GET users listing. */
router.get('/', function (req, res, next) {     
  Customer.find({},function (err, result) { 
    if (err) {
        return next(err);
    }
    res.status(200).send(result);          
  });


  router.post('/', function (req, res, next) {
    var body = req.body;
    var customer = new Customer(body);
    console.log(body);      
      customer.save(function (err, result) {
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
  
         
      Customer.findByIdAndUpdate(id, body, function (err, result) {
        if (err) {
            return next(err);
        }
        res.status(200).send(result);          
        });
  });


  router.delete('/', function (req, res, next) {
    var body = req.body.id;
    console.log(body);     
      Customer.findByIdAndRemove(body, function (err, result) {
        if (err) {
            return next(err);
        }

        res.status(200).send(result);          
      });
        
  });

});


  
module.exports = router;
