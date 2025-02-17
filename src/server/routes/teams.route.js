const express = require('express');

const router = express.Router();

const authorize = require('../middleware/auth.middleware');
const validateEndpoint = require('../middleware/validate.middleware');
const paginate = require('../middleware/paginate.middleware');

const { createTeam, updateTeam, getTeams, inviteTeamMember, getTeamMembers } = require('../controllers/teams.controller');
const { createTeamSchema, updateTeamSchema, inviteTeamMemberSchema } = require('../validations/teams.validation');

const { TEAMS_PATH } = require('../utils/enum/routes');

router.post(TEAMS_PATH.CREATE_TEAM, authorize, validateEndpoint(createTeamSchema), createTeam);
router.patch(TEAMS_PATH.UPDATE_TEAM, authorize, validateEndpoint(updateTeamSchema), updateTeam);
router.get(TEAMS_PATH.GET_TEAMS, authorize, getTeams);
router.get(TEAMS_PATH.GET_TEAM_MEMBERS, authorize, paginate, getTeamMembers);
router.post(TEAMS_PATH.INVITE_TEAM_MEMBERS, authorize, validateEndpoint(inviteTeamMemberSchema), inviteTeamMember);

module.exports = router;
