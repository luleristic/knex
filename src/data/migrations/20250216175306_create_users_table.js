/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('users', table => {
		table.increments('id').primary();
		table.integer('team_id').unsigned().references('id').inTable('teams').onDelete('CASCADE');
		table.string('name').notNullable();
		table.string('email').notNullable().unique();
		table.string('password').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('users');
};
