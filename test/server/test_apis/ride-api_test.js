// require('../../test-helper');
// const db = require('../../../lib/db');
// const request = require('supertest');
// const routes = require(__server + '/index.js');
// const dbCleaner = require('knex-cleaner');
// const Seed = require('../../lib/seed_test');
// var seedData;

// var testUser1 = {
//   username: 'Cheenus',
//   password: 'abc123',
//   first_name: 'Don',
//   last_name: 'Cheen',
//   street_address: '700 Priced Dr',
//   city: 'Austin',
//   state: 'Texas',
//   zipcode: 123456,
//   phone_number: 1,
//   email: 'doncheen@hotmail.com',
//   emergency_contact: 'Nobody.',
//   avatar: 'yahoo.com',
// };

// var testUser2 = {
//   username: 'GregB',
//   password: '123abc',
//   first_name: 'Greg',
//   last_name: 'Brady',
//   street_address: '700 Bunch Dr',
//   city: 'Bonobo',
//   state: 'Africa',
//   zipcode: 654321,
//   phone_number: 2,
//   email: 'gregb@hotmail.com',
//   emergency_contact: 'Marsha Marsha Marsha',
//   avatar: 'google.com',
// };

// describe('Ride API', function () {

//   beforeEach_(function * () {
//     yield Seed.cleaner();
//     seedData = yield* Seed.runner();
//   });

//   var app = TestHelper.createApp();

//   app.use('/', routes);
//   app.testReady();

//   it_('Should create rider in database', function * () {
//     var newestRider = {
//       userId: seedData.user1Id[0].user_id,
//       location: '700 E. 8th street Austin, Tx',
//     };

//     console.log('attempting to insert user with id:', newestRider);

//     yield request(app)
//       .post('/rides/riders')
//       .send(newestRider)
//       .expect(202)
//       .expect(function (response) {
//         var rider = response.body;
//         expect(rider.avatar).to.not.be.undefined;
//         expect(rider.location).to.equal('700 E. 8th street Austin, Tx');
//       });
//   });

//   it_('Should create ride in database', function * () {
//     var ride1 = {
//       ride_driver: seedData.user3Id[0].user_id,
//       ride_rider: seedData.user2Id[0].user_id,
//     };

//     yield request(app)
//       .post('/rides')
//       .send(ride1)
//       .expect(201)
//       .expect(function (response) {
//         var ride = response.body[0];
//         expect(ride.ride_id).to.not.be.undefined;
//         expect(ride.ride_driver).to.equal(seedData.user3Id[0].user_id);
//         expect(ride.ride_rider).to.equal(seedData.user2Id[0].user_id);
//       });
//   });
// });
