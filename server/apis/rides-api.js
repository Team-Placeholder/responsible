require('../server-helpers');
var RideAPI = require('express').Router();

var io = require('../lib/ioConfig').io;
if (process.env.NODE_ENV === 'test') {
  var MockedSocketIO = {};
  MockedSocketIO.sockets = [];
  MockedSocketIO.sockets.emit = function () {};

  io = MockedSocketIO;
}

var Ride = require(__models + '/rides');
var Friends = require(__models + '/friends');
var User = require(__models + '/user');

module.exports = RideAPI;

/*
* Rides routes
*/

//Get all rides
RideAPI.get('/', function (req, res) {
  // io.sockets.emit('receive_message', { id: 9, text: 'gassy', time: '22:50' });

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

/*
  Removes a ride or rider from the database.

  Effectively ends an ongoing ride or cancel a request for a ride.

  expects req.body:
    { userId }
        OR
    { userId (which partner is canceling), rideId }
  depending on whether it is a ride in progress of just a request for one.
*/
RideAPI.delete('/', function (req, res) {
  console.log('removing ride(r) by id:', req.body);

  var rideExists = false;
  if (req.body.rideId) rideExists = true;

  if (rideExists) {
    Ride.deleteRide(req.body.rideId)
      .then(sendStatus(res, 200))
      .catch(sendStatusAndError(res, 500));

    // emit to only the appropriate other party
    //   hint: emit to ride partner of rideId (knowing who canceled)
    io.sockets.emit('cancel_ride', req.body);
  } else {
    Ride.deleteRider(req.body.userId)
      .then(sendStatus(res, 200))
      .catch(sendStatusAndError(res, 500));

    // no rides in progress -- emit to friends of rider.
    io.sockets.emit('remove_rider', req.body);
  }
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

// expects req.body: { userId, location }
// response: { }
RideAPI.post('/riders', function (req, res) {
  var attrs = req.body;
  var rider = null;
  var _location = req.body.location;

  var riderToInsert = {
    foreign_rider: req.body.userId,
    location: req.body.location,
  };

  Ride.createRider(riderToInsert)
    .then(function (newRider) {
      // location = newRider[0].location;
      return User.findUserById(newRider[0].foreign_rider);
    })
    .then(function (user) {
      rider = user;
      rider.location = _location;
      return Friends.getFriendDrivers(rider.user_id);
    })
    .then(function (friendDrivers) {
      io.emitTo(friendDrivers, 'add_rider', rider);
      return rider;
    })
    .catch(sendStatusAndError(res, 500, 'error emiting new rider'))
    .then(sendStatus(res, 202));
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
    .then((driver) => Friends.getFriendRiders(driver.foreign_driver))
    .then(sendStatusAndData(res, 201))
    .catch(sendStatusAndError(res, 500, 'error creating driver'));
});

RideAPI.delete('/drivers', function (req, res) {
  var id = req.body;
  console.log('Delete Driver req.body', id);
  Ride.deleteDriver(id)
    .then(sendStatusAndData(res, 201))
    .catch(sendStatusAndError(res, 500, 'error deleting driver'));
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

