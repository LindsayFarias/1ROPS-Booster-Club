
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('income').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('income').insert([
        {date: '2021-03-22', amount: 50},
        {date: '2020-06-21', amount: 20},
        {date: '2021-05-25', amount: 1000}
      ]);
    });
};
