const express = require('express');

const router = express.Router();

const authorize = require('../middleware/auth.middleware');
const paginate = require('../middleware/paginate.middleware');

const { getNotifications } = require('../controllers/notification.controller');

const { NOTIFICATIONS_PATH } = require('../utils/enum/routes');

router.get(NOTIFICATIONS_PATH.GET_NOTIFICATIONS, authorize, paginate, getNotifications);

module.exports = router;
