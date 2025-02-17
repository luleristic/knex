/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('users_teams', table => {
		table.increments('id').primary();
		table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
		table.integer('team_id').unsigned().references('id').inTable('teams').onDelete('CASCADE');
		table.primary(['user_id', 'team_id']);
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('users_teams');
};
