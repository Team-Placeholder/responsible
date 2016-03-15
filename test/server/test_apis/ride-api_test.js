require('../../test-helper');
var db = require('../../../lib/db');
var request = require('supertest');
var routes = require(__server + '/index.js');
const dbCleaner = require('knex-cleaner');

var testUser1 = {
  username: 'Cheenus',
  password: 'abc123',
  first_name: 'Don',
  last_name: 'Cheen',
  street_address: '700 Priced Dr',
  city: 'Austin',
  state: 'Texas',
  zipcode: 123456,
  phone_number: 1,
  email: 'doncheen@hotmail.com',
  emergency_contact: 'Nobody.',
  avatar: 'yahoo.com',
};

var testUser2 = {
  username: 'GregB',
  password: '123abc',
  first_name: 'Greg',
  last_name: 'Brady',
  street_address: '700 Bunch Dr',
  city: 'Bonobo',
  state: 'Africa',
  zipcode: 654321,
  phone_number: 2,
  email: 'gregb@hotmail.com',
  emergency_contact: 'Marsha Marsha Marsha',
  avatar: 'google.com',
};

describe('Ride API', function () {

  beforeEach(function () {
    return dbCleaner.clean(db, { mode: 'truncate' });
  });

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it_('Should create rider in database', function * () {
    var user1IdOnInsert  = null;
    var user2IdOnInsert  = null;
    var riderIdOnInsert  = null;
    var driverIdOnInsert = null;

    yield request(app)
      .post('/user')
      .send(testUser1)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user1IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Don');
        expect(user.username).to.equal('Cheenus');
      });

    yield request(app)
      .post('/user')
      .send(testUser2)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user2IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Greg');
        expect(user.username).to.equal('GregB');
      });

    var rider1 = {
      foreign_rider: user1IdOnInsert,
      location: '700 E. 8th street Austin, Tx',
    };

    yield request(app)
      .post('/rides/riders')
      .send(rider1)
      .expect(201)
      .expect(function (response) {
        var rider = response.body[0];
        riderIdOnInsert = rider.rider_id;
        expect(rider.foreign_rider).to.not.be.undefined;
        expect(rider.location).to.equal('700 E. 8th street Austin, Tx');
      });
  });

  it_('Should create driver in database', function * () {
    var user1IdOnInsert  = null;
    var user2IdOnInsert  = null;
    var riderIdOnInsert  = null;
    var driverIdOnInsert = null;

    yield request(app)
      .post('/user')
      .send(testUser1)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user1IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Don');
        expect(user.username).to.equal('Cheenus');
      });

    yield request(app)
      .post('/user')
      .send(testUser2)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user2IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Greg');
        expect(user.username).to.equal('GregB');
      });

    var driver1 = {
      foreign_driver: user2IdOnInsert,
      location: '700 Rock Ledge Arcadia, Oklahoma',
    };

    yield request(app)
      .post('/rides/drivers')
      .send(driver1)
      .expect(201)
      .expect(function (response) {
        var driver = response.body[0];
        driverIdOnInsert = driver.driver_id;
        expect(driver.foreign_driver).to.not.be.undefined;
        expect(driver.location).to.equal('700 Rock Ledge Arcadia, Oklahoma');
      });
  });

  it_('Should create ride in database', function * () {
    var user1IdOnInsert  = null;
    var user2IdOnInsert  = null;
    var riderIdOnInsert  = null;
    var driverIdOnInsert = null;

    yield request(app)
      .post('/user')
      .send(testUser1)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user1IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Don');
        expect(user.username).to.equal('Cheenus');
      });

    yield request(app)
      .post('/user')
      .send(testUser2)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user2IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Greg');
        expect(user.username).to.equal('GregB');
      });

    var rider1 = {
      foreign_rider: user1IdOnInsert,
      location: '700 E. 8th street Austin, Tx',
    };

    yield request(app)
      .post('/rides/riders')
      .send(rider1)
      .expect(201)
      .expect(function (response) {
        var rider = response.body[0];
        riderIdOnInsert = rider.rider_id;
        expect(rider.foreign_rider).to.not.be.undefined;
        expect(rider.location).to.equal('700 E. 8th street Austin, Tx');
      });

    var driver1 = {
      foreign_driver: user2IdOnInsert,
      location: '700 Rock Ledge Arcadia, Oklahoma',
    };

    yield request(app)
      .post('/rides/drivers')
      .send(driver1)
      .expect(201)
      .expect(function (response) {
        var driver = response.body[0];
        driverIdOnInsert = driver.driver_id;
        expect(driver.foreign_driver).to.not.be.undefined;
        expect(driver.location).to.equal('700 Rock Ledge Arcadia, Oklahoma');
      });

    var ride1 = {
      ride_driver: user1IdOnInsert,
      ride_rider: user2IdOnInsert,
    };

    yield request(app)
      .post('/rides')
      .send(ride1)
      .expect(201)
      .expect(function (response) {
        var ride = response.body[0];
        expect(ride.ride_id).to.not.be.undefined;
        expect(ride.ride_driver).to.equal(user1IdOnInsert);
        expect(ride.ride_rider).to.equal(user2IdOnInsert);
      });
  });

  it_('Should get rides in database', function * () {
    var user1IdOnInsert  = null;
    var user2IdOnInsert  = null;
    var riderIdOnInsert  = null;
    var driverIdOnInsert = null;
    var ride1IdOnInsert  = null;

    yield request(app)
      .post('/user')
      .send(testUser1)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user1IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Don');
        expect(user.username).to.equal('Cheenus');
      });

    yield request(app)
      .post('/user')
      .send(testUser2)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user2IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Greg');
        expect(user.username).to.equal('GregB');
      });

    var rider1 = {
      foreign_rider: user1IdOnInsert,
      location: '700 E. 8th street Austin, Tx',
    };

    yield request(app)
      .post('/rides/riders')
      .send(rider1)
      .expect(201)
      .expect(function (response) {
        var rider = response.body[0];
        riderIdOnInsert = rider.rider_id;
        expect(rider.foreign_rider).to.not.be.undefined;
        expect(rider.location).to.equal('700 E. 8th street Austin, Tx');
      });

    var driver1 = {
      foreign_driver: user2IdOnInsert,
      location: '700 Rock Ledge Arcadia, Oklahoma',
    };

    yield request(app)
      .post('/rides/drivers')
      .send(driver1)
      .expect(201)
      .expect(function (response) {
        var driver = response.body[0];
        driverIdOnInsert = driver.driver_id;
        expect(driver.foreign_driver).to.not.be.undefined;
        expect(driver.location).to.equal('700 Rock Ledge Arcadia, Oklahoma');
      });

    var ride1 = {
      ride_driver: user1IdOnInsert,
      ride_rider: user2IdOnInsert,
    };

    yield request(app)
      .post('/rides')
      .send(ride1)
      .expect(201)
      .expect(function (response) {
        var ride = response.body[0];
        ride1IdOnInsert = ride.ride_id;
        expect(ride.ride_id).to.not.be.undefined;
      });

    yield request(app)
      .get('/rides')
      .expect(200)
      .expect(function (response) {
        var ride = response.body[0];
        expect(ride.ride_id).to.equal(ride1IdOnInsert);
        expect(ride.ride_driver).to.equal(user1IdOnInsert);
        expect(ride.ride_rider).to.equal(user2IdOnInsert);
      });
  });

  it_('Should get rides by id', function * () {
    var user1IdOnInsert  = null;
    var user2IdOnInsert  = null;
    var riderIdOnInsert  = null;
    var driverIdOnInsert = null;
    var ride1IdOnInsert  = null;

    yield request(app)
      .post('/user')
      .send(testUser1)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user1IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Don');
        expect(user.username).to.equal('Cheenus');
      });

    yield request(app)
      .post('/user')
      .send(testUser2)
      .expect(201)
      .expect(function (response) {
        var user = response.body[0];
        user2IdOnInsert = user.user_id;
        expect(user.user_id).to.not.be.undefined;
        expect(user.first_name).to.equal('Greg');
        expect(user.username).to.equal('GregB');
      });

    var rider1 = {
      foreign_rider: user1IdOnInsert,
      location: '700 E. 8th street Austin, Tx',
    };

    yield request(app)
      .post('/rides/riders')
      .send(rider1)
      .expect(201)
      .expect(function (response) {
        var rider = response.body[0];
        riderIdOnInsert = rider.rider_id;
        expect(rider.foreign_rider).to.not.be.undefined;
        expect(rider.location).to.equal('700 E. 8th street Austin, Tx');
      });

    var driver1 = {
      foreign_driver: user2IdOnInsert,
      location: '700 Rock Ledge Arcadia, Oklahoma',
    };

    yield request(app)
      .post('/rides/drivers')
      .send(driver1)
      .expect(201)
      .expect(function (response) {
        var driver = response.body[0];
        driverIdOnInsert = driver.driver_id;
        expect(driver.foreign_driver).to.not.be.undefined;
        expect(driver.location).to.equal('700 Rock Ledge Arcadia, Oklahoma');
      });

    var ride1 = {
      ride_driver: user1IdOnInsert,
      ride_rider: user2IdOnInsert,
    };

    yield request(app)
      .post('/rides')
      .send(ride1)
      .expect(201)
      .expect(function (response) {
        var ride = response.body[0];
        ride1IdOnInsert = ride.ride_id;
        expect(ride.ride_id).to.not.be.undefined;
      });

    yield request(app)
      .get('/rides/' + ride1IdOnInsert)
      .expect(200)
      .expect(function (response) {
        var ride = response.body[0];
        expect(ride.ride_id).to.equal(ride1IdOnInsert);
        expect(ride.ride_driver).to.equal(user1IdOnInsert);
        expect(ride.ride_rider).to.equal(user2IdOnInsert);
      });
  });
});

  // it_('Should get all rides in database', function * () {
  //   var user1IdOnInsert = null;
  //   var user2IdOnInsert = null;

  //   yield request(app)
  //     .post('/user')
  //     .send(testUser1)
  //     .expect(201)
  //     .expect(function (response) {
  //       var user = response.body[0];
  //       user1IdOnInsert = user.user_id;
  //       expect(user.user_id).to.not.be.undefined;
  //       expect(user.first_name).to.equal('Don');
  //       expect(user.username).to.equal('Cheenus');
  //     });

  //   yield request(app)
  //     .post('/user')
  //     .send(testUser2)
  //     .expect(201)
  //     .expect(function (response) {
  //       var user = response.body[0];
  //       user2IdOnInsert = user.user_id;
  //       expect(user.user_id).to.not.be.undefined;
  //       expect(user.first_name).to.equal('Greg');
  //       expect(user.username).to.equal('GregB');
  //     });

  //   var ride1 = {
  //     foreign_driver: user1IdOnInsert,
  //     foreign_rider: driverIdOnInsert,
  //   };

  //   yield request(app)
  //     .post('/rides')
  //     .send(ride1)
  //     .expect(201)
  //     .expect(function (response) {
  //       var ride = response.body[0];
  //       expect(ride.ride_id).to.not.be.undefined;
  //       expect(ride.foreign_driver).to.equal(user1IdOnInsert);
  //       expect(ride.foreign_rider).to.equal(user2IdOnInsert);
  //     });

  //   yield request(app)
  //     .get('/rides')
  //     .expect(200)
  //     .expect(function (response) {
  //       var ride = response.body[0];
  //       expect(ride.ride_id).to.not.be.undefined;
  //       expect(ride.foreign_driver).to.equal(user1IdOnInsert);
  //       expect(ride.foreign_rider).to.equal(user2IdOnInsert);
  //     });
  // });

//   it_('Should delete ride by Id', function * () {
//     var user1IdOnInsert = null;
//     var user2IdOnInsert = null;
//     var ride1IdOnInsert = null;

//     yield request(app)
//       .post('/user')
//       .send(testUser1)
//       .expect(201)
//       .expect(function (response) {
//         var user = response.body[0];
//         user1IdOnInsert = user.user_id;
//         expect(user.user_id).to.not.be.undefined;
//         expect(user.first_name).to.equal('Don');
//         expect(user.username).to.equal('Cheenus');
//       });

//     yield request(app)
//       .post('/user')
//       .send(testUser2)
//       .expect(201)
//       .expect(function (response) {
//         var user = response.body[0];
//         user2IdOnInsert = user.user_id;
//         expect(user.user_id).to.not.be.undefined;
//         expect(user.first_name).to.equal('Greg');
//         expect(user.username).to.equal('GregB');
//       });

//     var ride1 = {
//       foreign_driver: user1IdOnInsert,
//       foreign_rider: user2IdOnInsert,
//     };

//     yield request(app)
//       .post('/rides')
//       .send(ride1)
//       .expect(201)
//       .expect(function (response) {
//         var ride = response.body[0];
//         ride1IdOnInsert = ride.ride_id;
//         expect(ride.ride_id).to.not.be.undefined;
//         expect(ride.foreign_driver).to.equal(user1IdOnInsert);
//         expect(ride.foreign_rider).to.equal(user2IdOnInsert);
//       });

//     yield request(app)
//       .delete('/rides/' + ride1IdOnInsert)
//       .expect(200);
//   });

// });

