
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('income_event').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('income_event').insert([
        {income: 3, event: 1},
        {income: 2, event: 1}
      ]);
    });
};
