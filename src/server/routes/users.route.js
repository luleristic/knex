const express = require('express');

const router = express.Router();

const authorize = require('../middleware/auth.middleware');
const validateEndpoint = require('../middleware/validate.middleware');

const { register, login, getMe, updateMe } = require('../controllers/users.controller');

const { registerSchema, loginSchema, updateMeSchema } = require('../validations/users.validation');

const { USERS_PATH } = require('../utils/enum/routes');

router.post(USERS_PATH.REGISTER, validateEndpoint(registerSchema), register);
router.post(USERS_PATH.LOGIN, validateEndpoint(loginSchema), login);
router.get(USERS_PATH.ME, authorize, getMe);
router.patch(USERS_PATH.ME, authorize, validateEndpoint(updateMeSchema), updateMe);

module.exports = router;
