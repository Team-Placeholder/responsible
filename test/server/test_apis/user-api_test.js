require('../../test-helper');

var request = require('supertest');
var routes = require(__server + '/index.js');

describe('Test tester', function () {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it_('serves an example endpoint', function * () {

    //
    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
    yield request(app)
      .get('/api/tags-example')
      .expect(200)
      .expect(function (response) {
        expect(response.body).to.include('node');
      });
  });
});

describe('User API', function () {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it_('Should insert user', function * () {
    var attrs = {
      username: 'Cheenus',
      password: 'abc123',
      first_name: 'Don',
      last_name: 'Cheen',
      street_address: '700 Priced Dr',
      city: 'Austin',
      state: 'Texas',
      zipcode: 123456,
      phone_number: 4051234567890,
      email: 'doncheen@hotmail.com',
      emergency_contact: 'Nobody.',
      avatar: 'http://www.vinylrevinyl.com/wp-content/uploads/2008/12/rick-james.jpg',
    };

    //Mocha will wait for returned promises to complete
    return request(app)
        .post('/user')
        .send(attrs)
        .expect(201)
        .expect(function (response) {
          var user = response.body;

          expect(user.id).to.not.be.undefined;
          expect(user.first_name).to.equal('Don');
          expect(user.address).to.equal('700 Priced Dr');
        })
        .then(function () {

          return request(app)
            .get('/user')
            .expect(200)
            .expect(function (response) {
              var users = response.body;
              expect(users).to.be.an.instanceOf(Array);
              expect(users).to.have.length(1);
              expect(users[0].name).to.equal('Don');
            });
        });
  });
});
