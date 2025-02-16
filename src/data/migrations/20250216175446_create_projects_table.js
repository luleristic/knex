/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('projects', table => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.integer('team_id').unsigned().references('id').inTable('teams').onDelete('CASCADE');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('projects');
};
