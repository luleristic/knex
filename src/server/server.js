require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');

const corsOptions = require('./utils/express/cors');

const errorHandler = require('./middleware/error.middleware');
const { BASE_PATH } = require('./utils/enum/routes');

const port = process.env.PORT || 5005;

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use(BASE_PATH.USERS, require('./routes/users.route'));
app.use(BASE_PATH.TEAMS, require('./routes/teams.route'));
app.use(BASE_PATH.PROJECTS, require('./routes/projects.route'));
app.use(BASE_PATH.TODOS, require('./routes/todos.route'));

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
