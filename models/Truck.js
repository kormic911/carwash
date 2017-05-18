var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vehicle = require('./Vehicle');

var truckSchema = new Schema({
	hasMud: {type: Boolean, default: false},
	hasBedDown: {type: Boolean, default: false}
});

truckSchema.pre('save', function(next) {
	this.charge = 10;
	if(this.hasMud) {
		this.charge = 12;
	}

	if(this.returningCustomer) {
		this.charge = this.charge - (this.charge * .5);
	}

	if(this.hasBedDown) {
		var error = new Error('Trucks with the bed down are not allowed.');
		next(error);
	} else {
		next();
	}
});

var Truck = Vehicle.discriminator('Truck', truckSchema);

module.exports = Truck;
