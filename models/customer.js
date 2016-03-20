var mongoose = require('mongoose');
var util = require('util');
var Schema = mongoose.Schema;
var PersonSchema  =  mongoose.schemas.Person;

function extendSchema() {           
  Schema.apply(this, arguments);          
    this.add({
    name: {
      first: String,
      last: String
    },
    
    dateOfBirth: { type: Date, default: Date.now }  //DateType
  });                                     
};                                          
                                            
util.inherits(extendSchema, Schema);

var CustomerSchema = new extendSchema({
  companyName: String,
  phone: {
    mobile: String,
    work: String
  },
  skype: String
});

var Customer = mongoose.model('customer', CustomerSchema);

mongoose.schemas = {};
mongoose.schemas.Customer = CustomerSchema;