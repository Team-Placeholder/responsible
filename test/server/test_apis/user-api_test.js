// require('../../test-helper');
// var db = require('../../../lib/db');
// var request = require('supertest');
// var routes = require(__server + '/index.js');
// const dbCleaner = require('knex-cleaner');

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

// describe('Test tester', function () {

//   beforeEach(function () {
//     return dbCleaner.clean(db, { mode: 'truncate' });
//   });

//   var app = TestHelper.createApp();
//   app.use('/', routes);
//   app.testReady();

//   it_('serves an example endpoint', function * () {
//     //
//     // Notice how we're in a generator function (indicated by the the *)
//     // See test/test-helper.js for details of why this works.
//     //
//     yield request(app)
//       .get('/api/tags-example')
//       .expect(200)
//       .expect(function (response) {
//         expect(response.body).to.include('node');
//       });
//   });
// });

// describe('User API', function () {

//   beforeEach(function () {
//     return dbCleaner.clean(db, { mode: 'truncate' });
//   });

//   var app = TestHelper.createApp();
//   app.use('/', routes);
//   app.testReady();

//   it_('Should insert user into database', function * () {

//     //Mocha will wait for returned promises to complete
//     yield request(app)
//       .post('/user')
//       .send(testUser1)
//       .expect(201)
//       .expect(function (response) {
//         var user = response.body[0];
//         expect(user.user_id).to.not.be.undefined;
//         expect(user.first_name).to.equal('Don');
//         expect(user.username).to.equal('Cheenus');
//       });
//   });

//   it_('Should get all users from database', function * () {
//     yield request(app)
//       .post('/user')
//       .send(testUser1)
//       .expect(201)
//       .expect(function (response) {
//         var user = response.body[0];
//         expect(user.user_id).to.not.be.undefined;
//         expect(user.first_name).to.equal('Don');
//         expect(user.username).to.equal('Cheenus');
//       });

//     yield request(app)
//       .get('/user')
//       .expect(200)
//       .expect(function (response) {
//         var users = response.body;
//         var first = response.body[0];
//         expect(users).to.be.an.instanceOf(Array);
//         expect(users).to.have.length(1);
//         expect(first.first_name).to.equal('Don');
//       });
//   });

//   it_('Should find user by user ID', function * () {
//     var user2IdOnInsert = null;

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

//     yield request(app)
//       .get('/user/' + user2IdOnInsert)
//       .expect(200)
//       .expect(function (response) {
//         var user = response.body;
//         expect(user.user_id).to.equal(user2IdOnInsert);
//         expect(user.username).to.equal('GregB');
//       });
//   });

//   it_('Should delete user by id', function * () {
//     var user1IdOnInsert = null;

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
//       .delete('/user/' + user1IdOnInsert)
//       .expect(200);
//   });

//   //Not MVP, moving on.

//   // it_('Should update user information', function * () {
//   //   var user1IdOnInsert = null;

//   //   yield request(app)
//   //     .post('/user')
//   //     .send(testUser1)
//   //     .expect(201)
//   //     .expect(function (response) {
//   //       var user = response.body[0];
//   //       user1IdOnInsert = user.id;
//   //       expect(user.id).to.not.be.undefined;
//   //       expect(user.first_name).to.equal('Don');
//   //       expect(user.username).to.equal('Cheenus');
//   //     });

//   //   yield request(app)
//   //     .put('/user/' + user1IdOnInsert)
//   //     .expect(function () {
//   //       testUser1.phone_number = 3;
//   //     })
//   //     .send(testUser1)
//   //     .expect(201)
//   //     .expect(function (response) {
//   //       var user = response.body[0];
//   //       user1IdOnInsert = user.id;
//   //       expect(user.id).to.not.be.undefined;
//   //       expect(user.first_name).to.equal('Don');
//   //       expect(user.phone_number).to.equal(3);
//   //     });
//   // });
// });
