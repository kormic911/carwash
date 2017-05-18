var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleSchema = new Schema({
	licensePlate: {type: String, required: true},
	charge: Number,
	returningCustomer: {type: Boolean, default: false}
}, {discriminatorKey: 'type' });

vehicleSchema.pre('save', function(next) {
	if(this.licensePlate == '1111111') {
		var error = new Error('Vehicle is stolen');
		next(error);
	}
	var self = this;
	this.constructor.findOne({licensePlate: this.licensePlate}, function(err, doc) {
		if(doc) {
			self.returningCustomer = true;
		}
		next();
	});
});

var Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
