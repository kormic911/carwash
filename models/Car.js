var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vehicle = require('./Vehicle');

var carSchema = new Schema({
});

carSchema.pre('save', function(next) {
	this.charge = 5;
	if(this.returningCustomer) {
		this.charge = this.charge - (this.charge * .5);
	}

	next();
});

var Car = Vehicle.discriminator('Car', carSchema);

module.exports = Car;
