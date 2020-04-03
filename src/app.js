const express = require('express');
require('./db/mongoose');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();

// permet de parser les JSON entrants en 
app.use(express.json());

// routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app