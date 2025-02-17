const db = require('../../data/config/connection');
const NotificationRepository = require('../../data/repositories/notification.repository');

const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApplicationError = require('../utils/express/error');
const ApiResponse = require('../utils/express/response');

const getNotifications = async (req, res, next) => {
	try {
		const user = req.user;

		const { offset, limit, page } = req.pagination;

		const notifications = await db('notifications').where({ user_id: user.id });

		const notSeenNotifications = notifications.filter(notification => !notification.is_read);
		const notSeenNotificationsIds = notSeenNotifications.map(notification => notification.id);

		await NotificationRepository.markAsReadNotifications(notSeenNotificationsIds);

		const total = await db('notifications').where({ user_id: user.id }).count('id');

		const payload = {
			limit,
			page,
			notifications,
			total: parseInt(total[0].count)
		};

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, payload);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getNotifications
};
