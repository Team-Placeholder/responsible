const dbCleaner = require('knex-cleaner');
const db = require('../../lib/db');

const User = require('../../server/models/user');
const Friend = require('../../server/models/friends');
const Ride = require('../../server/models/rides');

var Seed = {};
module.exports = Seed;

Seed.user1 = {
  username: 'Cheenus',
  password: 'abc123',
  name: 'don cheenus',
  address: { lat: 30.263619, lng: -97.737909 },
  zipcode: 123456,
  phone_number: 1,
  email: 'doncheen@hotmail.com',
  emergency_contact: 'Nobody.',
  avatar: 'yahoo.com',
};

Seed.user2 = {
  username: 'GregB',
  password: '123abc',
  name: 'greg brady',
  address: { lat: 30.2687464, lng: -97.741185 },
  zipcode: 654321,
  phone_number: 2,
  email: 'gregb@hotmail.com',
  emergency_contact: 'Marsha Marsha Marsha',
  avatar: 'google.com',
};

Seed.user3 = {
  username: 'CharlieBrizzown',
  password: 'cheesePlease',
  name: 'charlie brizz',
  address: { lat: 30.264753, lng: -97.745835 },
  zipcode: 73036,
  phone_number: '405-441-9910',
  email: 'charbrizz@hotmail.com',
  emergency_contact: 'Snoopy',
  avatar: 'hotmail.com',
};

Seed.user4 = {
  username: 'GumpDump(69)[420]weed',
  password: 'jennyFoundWaysToExpandHerMind',
  name: 'forest gump',
  address: { lat: 31.271188, lng: -97.7469099 },
  zipcode: 654321,
  phone_number: '710-420-6969',
  email: 'bubbaIsGone@hotmail.com',
  emergency_contact: 'Jenny, oh wait...',
  avatar: 'gumpshrimp.com',
};

Seed.user5 = {
  username: 'BrockNoFriends',
  password: 'brockhasnofriends',
  name: 'Brock NoFriend',
  address: '911 No Friends drive',
  zipcode: 654321,
  phone_number: '405-272-2272',
  email: 'brocknofriends@hotmail.com',
  emergency_contact: 'literally nobody',
  avatar: 'nofriends.com',
};

Seed.makeUser = function (user) {
  return User.createUser(user);
};

Seed.makeFriend = function (id1, id2) {
  return Friend.createFriendship(id1, id2);
};

Seed.makeRider = function (rider) {
  return Ride.createRider(rider);
};

Seed.cleaner = function () {
  return dbCleaner.clean(db, { mode: 'truncate' });
};

Seed.runner = function * () {
  // console.log('Seed:', Seed);
  const user1Id = yield Seed.makeUser(Seed.user1);
  const user2Id = yield Seed.makeUser(Seed.user2);
  const user3Id = yield Seed.makeUser(Seed.user3);
  const user4Id = yield Seed.makeUser(Seed.user4);
  const user5Id = yield Seed.makeUser(Seed.user5);

  const friend1 = yield Seed.makeFriend(user1Id.user_id, user3Id.user_id);
  const friend2 = yield Seed.makeFriend(user2Id.user_id, user4Id.user_id);

  const rider1  = {
    foreign_rider: user1Id.user_id,
    location: '700 E. 8th street Austin, Tx',
  };
  const rider2  = {
    foreign_rider: user2Id.user_id,
    location: '1000 Freckle Face Weigh',
  };
  const riderId1 = yield Seed.makeRider(rider1);
  const riderId2 = yield Seed.makeRider(rider2);

  const driver1 = {
    foreign_driver: user3Id.user_id,
    location: '1826 Niblick Way',
  };
  const driver2 = {
    foreign_driver: user4Id.user_id,
    location: '100 Shark Lane',
  };
  const driverID1 = yield db('drivers').insert(driver1, 'driver_id');
  const driverID2 = yield db('drivers').insert(driver2, 'driver_id');

  return { user1Id, user2Id, user3Id, user4Id, user5Id,
    friend1, friend2, rider1, rider2,
    riderId1, riderId2, driver1, driver2,
    driverID1, driverID2,
  };
};
