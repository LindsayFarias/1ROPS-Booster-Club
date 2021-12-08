
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('income_patch').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('income_patch').insert([
        {income: 1, patch: 1}
      ]);
    });
};
