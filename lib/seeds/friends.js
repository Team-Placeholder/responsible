exports.seed = function (knex) {
  return knex('friends').insert([
    {
      foreign_friend1: 1, foreign_friend2: 2,
    },
    {
      foreign_friend1: 1, foreign_friend2: 3,
    },
    {
      foreign_friend1: 1, foreign_friend2: 4,
    },
    {
      foreign_friend1: 1, foreign_friend2: 5,
    },
  ])
    .catch(function (error) {
      console.error('Error seeding friends table', error);
    });
};
