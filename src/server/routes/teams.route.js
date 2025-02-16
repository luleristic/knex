const express = require('express');

const router = express.Router();

const authorize = require('../middleware/auth.middleware');
const validateEndpoint = require('../middleware/validate.middleware');
const paginate = require('../middleware/paginate.middleware');

const { getTeam, inviteTeamMember, getTeamMembers } = require('../controllers/teams.controller');
const { inviteTeamMemberSchema } = require('../validations/teams.validation');

const { TEAMS_PATH } = require('../utils/enum/routes');

router.get(TEAMS_PATH.GET_TEAM, authorize, getTeam);
router.get(TEAMS_PATH.GET_TEAM_MEMBERS, authorize, paginate, getTeamMembers);
router.post(TEAMS_PATH.INVITE_TEAM_MEMBERS, authorize, validateEndpoint(inviteTeamMemberSchema), inviteTeamMember);

module.exports = router;
