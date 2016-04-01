'use strict';
require('../server-helpers');
var db      = require('../../lib/db.js');
const first = require('ramda').head;

var User = {};
module.exports = User;

// get all users
User.getUsers = function () {
  return db('users').select('*')
    .catch(reportError('error retrieving username by userId'));
};

User.findUserBy = function (byWhat, isWhat) {
  return db('users').select('*').where({ [byWhat]: isWhat })
    .catch(reportError('error finding a user by ' + byWhat))
    .then(first);
};

User.findUserById = function (userId) {
  return User.findUserBy('user_id', userId);
};

User.findUserIdByName = function (searchString) {
  return db('users').select('user_id')
    .whereRaw('username ILIKE ?', searchString)
    .orWhereRaw('name ILIKE ?', searchString)
    .then(first)
    .catch(reportError('Error finding user_id by name and searchString:' + searchString));
};

// delete at user by their user_id
User.deleteUser = function (userId) {
  return db('users').where({ user_id: userId }).del()
    .catch(reportError('error deleting user by id'))
    .then(user => console.log('DELETING user:', user));
};

User.findFriends = function (userId) {
  // db.distinct('username').from('users').joinRaw('INNER JOIN trip_users
  // ON id_user = users.id AND id_trip = ?', [tripId]).select();

  var friends_part1 = [];
  var friends_part2 = [];
  var friends = [];

  return db('friends').select('foreign_friend2')
    .where({ foreign_friend1: userId })
    .then(function (fp1) {
      friends_part1 = fp1;
      return db('friends').select('foreign_friend1')
        .where({ foreign_friend2: userId });
    })
    .then(function (fp2) {
      friends_part2 = fp2;
    })
    .then(function () {
      friends = friends_part1.concat(friends_part2);

      friends = friends.map(function (friend) {
        return friend.foreign_friend1 ?
          friend.foreign_friend1 :
          friend.foreign_friend2;
      });

      return friends;
    })
    .then(function (friends) {
      return db('users').select('user_id', 'name', 'avatar', 'address')
        .whereIn('user_id', friends);
    });
};

function LetterCapitalize(str) {
  return str.split(' ').map(function (word, i) {
    return word[0].toUpperCase() + word.substr(1);
  }).join(' ');
}

User.createUser = function (attrs) {
  if (attrs.name) attrs.name = LetterCapitalize(attrs.name);
  if (attrs.username) attrs.username = LetterCapitalize(attrs.username);

  return db('users')
    .insert(attrs, ['user_id', 'name', 'username', 'email', 'avatar', 'address'])
    .then(first)
    .catch(reportError('error creating user into db'));
};

// username should probably just be name
User.updateUser = function (userId, attrs) {
  if (attrs.name) attrs.name = LetterCapitalize(attrs.name);
  if (attrs.username) attrs.username = LetterCapitalize(attrs.username);

  return db('users')
    .where({ user_id: userId })
    .update(attrs, ['user_id', 'username', 'email', 'avatar', 'address'])
    .then(first)
    .catch(reportError('error updating user by id:' + userId));
};

/**
 *  attrs is (all of the time?) an OAuth user object.
 *  We look in the DB for some unique property of this object
 *  if a user is found we update it, otherwise we create a
 *  new user with the OAuth object info.
 *
 *  returns: the whole user object
**/

User.createOrUpdateUser = function (verifyBy, attrs) {
  // Check if user is found by unique info (such as github token)
  return User.findUserBy(verifyBy, attrs[verifyBy])
    .then(function (foundEntry) {
      // If they are found, update their information in database
      if (foundEntry) {
        let userPropsToUpdateWithOAuth = {
          name: attrs.name,
          email: attrs.email,
          avatar: attrs.avatar,
        };
        return User.updateUser(foundEntry.user_id, userPropsToUpdateWithOAuth);
      } else {
        // Otherwise, create a new user
        return User.createUser(attrs);
      }
    })
    .then(function (_attrs) {
      // Once we have user, get all of their information
      return User.findUserById(_attrs.user_id);
    })
    .then(function (user) {
      return User.findFriends(user.user_id)
        .then(function (friends) {
          let dataForClient = {
            friends: friends,
            user: user,
          };
          return dataForClient;
        });
    })
    .catch(reportError('ERROR doing something creating/updating user. investigate'));
};

//
// uncomment to see how/if createOrUpdateUser is working.
//

// let verifyBy = 'zipcode';
// let OAuthUserObj1 = {
//   zipcode: 53240,
//   username: 'Ronnie Tu-tu',
//   email: 'rick@roll.groove',
//   avatar: 'imaginaryMindscape',
// };
// let OAuthUserObj2 = {
//   zipcode: 22222,
//   username: 'Jalapeno on a Stick',
//   email: 'just send it up my butt',
//   avatar: 'master hand',
//   first_name: 'Jap',
// };

// User.createOrUpdateUser(verifyBy, OAuthUserObj1)
//   .then(function (data) {
//     console.log('updated user data:', data);
//   });

// User.createOrUpdateUser(verifyBy, OAuthUserObj2)
//   .then(function (data) {
//     console.log('new user data:', data);
//   });
