const express = require('express');

const router = express.Router();

const authorize = require('../middleware/auth.middleware');
const validateEndpoint = require('../middleware/validate.middleware');
const paginate = require('../middleware/paginate.middleware');

const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projects.controller');
const { createProjectSchema, updateProjectSchema } = require('../validations/projects.validation');

const { PROJECTS_PATH } = require('../utils/enum/routes');

router.post(PROJECTS_PATH.CREATE_PROJECT, authorize, validateEndpoint(createProjectSchema), createProject);
router.get(PROJECTS_PATH.GET_PROJECTS, authorize, paginate, getProjects);
router.patch(PROJECTS_PATH.UPDATE_PROJECT, authorize, validateEndpoint(updateProjectSchema), updateProject);
router.delete(PROJECTS_PATH.DELETE_PROJECT, authorize, deleteProject);

module.exports = router;
