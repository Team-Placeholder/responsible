require('../server-helpers');
var RideAPI = require('express').Router();
var io = require('socket.io');

var Ride = require(__models + '/rides');
module.exports = RideAPI;

/*
* Rides routes
*/

//Get all rides
RideAPI.get('/', function (req, res) {
  Ride.getRides()
    .then(sendStatusAndData(res, 200))
    .catch(sendStatusAndError(res, 500, ('error getting rides')));
});

//Posting
RideAPI.post('/', function (req, res) {
  var ride = req.body;
  Ride.createRide(ride)
    .then(sendStatusAndData(res, 201))
    .catch(sendStatusAndError(res, 500, ('error creating user')));
});

RideAPI.get('/:id', function (req, res) {
  var id = req.params.id;
  Ride.getRideById(id)
    .then(sendStatusAndData(res, 200))
    .catch(sendStatusAndError(res, 500));
});

// Delete ride by id
RideAPI.delete('/:id', function (req, res) {
  var id = req.params.id;
  Ride.deleteRide(id)
    .then(sendStatusAndData(res, 200))
    .catch(sendStatusAndError(res, 500));
});

/*
* Rider routes
*/

// Get All Riders
RideAPI.get('/riders', function (req, res) {
  Ride.getRiders()
    .then(sendStatusAndData(res, 201))
    .catch(sendStatusAndError(res, 500, ('error creating rider')));
});

// Get Rider By Id
RideAPI.get('/riders/:id', function (req, res) {
  var id = req.params.id;
  Ride.getRiderById(id)
    .then(sendStatusAndData(res, 200))
    .catch(sendStatusAndError(res, 500));
});

// Post Rider
RideAPI.post('/riders', function (req, res) {
  var attrs = req.body;
  Ride.createRider(attrs)
    .then(sendStatusAndData(res, 201))
    .catch(sendStatusAndError(res, 500, 'error creating rider'));
});

/*
* Driver routes
*/

// Get All Drivers
RideAPI.get('/drivers', function (req, res) {
  Ride.getDrivers()
    .then(sendStatusAndData(res, 201))
    .catch(sendStatusAndError(res, 500, 'error retrieving drivers'));
});

// Get driver by id
RideAPI.get('/drivers/:id', function (req, res) {
  var id = req.params.id;
  Ride.getDriverById(id)
    .then(sendStatusAndData(res, 200))
    .catch(sendStatusAndError(res, 500));
});

// Post Driver
RideAPI.post('/drivers', function (req, res) {
  var attrs = req.body;
  Ride.createDriver(attrs)
    .then(sendStatusAndData(res, 201))
    .catch(sendStatusAndError(res, 500, 'error creating driver'));
});

/*
* Sockets
*/

// io.sockets.on('connection', function (socket) {
//   socket.on('send message', function (data) {
//     io.sockets.emit('new message', data);
//   });
//   socket.on('something else')
// });

