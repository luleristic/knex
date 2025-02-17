require('dotenv').config({ path: '.env.test' });

const db = require('../src/data/config/connection');

module.exports = async () => {
	if (process.env.NODE_ENV !== 'test') {
		console.error('Tests should only run in the test environment!');
		process.exit(1);
	}

	console.log('\n🧹 Cleaning up test database...');

	try {
		await db.migrate.rollback();
		await db.destroy();

		console.log('✅ Test database cleaned up!');

		process.exit(0);
	} catch (error) {
		console.error('❌ Error cleaning up test database:', error);
		process.exit(1);
	}
};
