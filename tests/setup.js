const dotenv = require('dotenv');
const path = require('path');

module.exports = async () => {
	if (process.env.NODE_ENV !== 'test') {
		console.error('Tests should only run in the test environment!');
		process.exit(1);
	}
	dotenv.config({ path: path.resolve(__dirname, './.env') });

	const db = require('../src/data/config/connection');

	console.log('\n🚀 Setting up test database...');

	try {
		await db.migrate.rollback();
		await db.migrate.latest();

		console.log('✅ Test database is ready!');
	} catch (error) {
		console.error('❌ Error setting up test database:', error);
		process.exit(1);
	}
};
