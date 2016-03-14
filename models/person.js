var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
	name: {
    first: String,
    last: String
  },
  
  dateOfBirth: { type: Date, default: Date.now }
});

var Person = mongoose.model('person', PersonSchema);

mongoose.schemas = {};
mongoose.schemas.Person = PersonSchema;
