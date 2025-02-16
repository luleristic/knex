const express = require('express');

const router = express.Router();

const authorize = require('../middleware/auth.middleware');
const validateEndpoint = require('../middleware/validate.middleware');
const paginate = require('../middleware/paginate.middleware');

const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todos.controller');
const { createTodoSchema, updateTodoSchema, getTodosSchema } = require('../validations/todos.validation');

const { TODOS_PATH } = require('../utils/enum/routes');

router.post(TODOS_PATH.CREATE_TODO, authorize, validateEndpoint(createTodoSchema), createTodo);
router.get(TODOS_PATH.GET_TODOS, authorize, paginate, validateEndpoint(getTodosSchema), getTodos);
router.patch(TODOS_PATH.UPDATE_TODO, authorize, validateEndpoint(updateTodoSchema), updateTodo);
router.delete(TODOS_PATH.DELETE_TODO, authorize, deleteTodo);

module.exports = router;
