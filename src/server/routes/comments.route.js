const express = require('express');

const router = express.Router();

const authorize = require('../middleware/auth.middleware');
const validateEndpoint = require('../middleware/validate.middleware');
const paginate = require('../middleware/paginate.middleware');

const { createComment, getComments } = require('../controllers/comments.controller');

const { COMMENTS_PATH } = require('../utils/enum/routes');
const { createCommentsSchema, getCommentsSchema } = require('../validations/comments.validation');

router.post(COMMENTS_PATH.CREATE_COMMENT, authorize, validateEndpoint(createCommentsSchema), createComment);
router.get(COMMENTS_PATH.GET_COMMENTS, authorize, paginate, validateEndpoint(getCommentsSchema), getComments);

module.exports = router;
