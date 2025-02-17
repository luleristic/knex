const db = require('../config/connection');

const NotificationRepository = {
	createNotification: async (userId, message) => {
		return await db('notifications').insert({ user_id: userId, message }).returning(['id', 'message']);
	},

	markAsReadNotifications: async notificationIds => {
		return await db('notifications').whereIn('id', notificationIds).update({ is_read: true });
	}
};

module.exports = NotificationRepository;
