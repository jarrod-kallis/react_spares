
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    // Gives the table an auto generating id
    table.increments();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('firstName');
    table.string('surname');
    table.string('timezone').notNullable();
    table.string('passwordDigest').notNullable();
    // Creates 'CreatedAt' & 'UpdatedAt' columns
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
