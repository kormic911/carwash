var Car = require('./models/Car');
var Truck = require('./models/Truck');
var Vehicle = require('./models/Vehicle');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/vehicle_database');

app.post('/vehicles', function(req, res) {
	if(req.body.type != 'Car' && req.body.type != 'Truck') {
		res.status(500).json({error: 'We only accept cars and trucks'});
	} else {
		Vehicle.create(req.body, function(err, vehicle) {
			if(err) {
				res.status(500).json({error: err.message});
			} else {
				res.json(vehicle);
			}
		});
	}
});

app.get('/vehicles', function(req, res) {
	Vehicle.find({}, function(err, docs) {
		res.json(docs);
	});	
});

app.listen(8080, '0.0.0.0', function() {
	console.log('Carwash started on port 8080');
});
