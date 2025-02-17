const NotificationRepository = require('../../data/repositories/notification.repository');

const pushNotification = async (userId, message) => {
	const notification = await NotificationRepository.createNotification(userId, message);

	return notification;
};

module.exports = {
	pushNotification
};
