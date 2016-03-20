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
    // console.log(body);      
    customer.save(function (err, result) {
      if (err) {
          return next(err);
      }
      res.status(200).send(result);          
      });
  });


  router.delete('/', function (req, res, next) {
    var body = req.query._id;
    console.log(body);     
      Customer.findByIdAndRemove(body, function (err, result) {
        if (err) {
            return next(err);
        }

        res.status(200).send(result);          
      });
        
  });

});

router.put('/', function (req, res, next) {
  console.log('---------------------------------------------------------');

  console.log(req.body.params);
  var body = req.body.params;
  var id = req.body.params.id;
  // delete body._id;

       
    Customer.findByIdAndUpdate(id, body, { new: true }, function (err, customer) {
      if (err) {
          return next(err);
      }
      res.status(200).send(customer);          
    });
});


  
module.exports = router;
