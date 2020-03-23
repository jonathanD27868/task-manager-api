/*

Heroku deployment

On initialise notre projet:
    git init

On regarde les éléments du projets:
    git status

on crée un fichier ".gitignore" et on mets dedans:
    node_modules
    config
Pour les exclure avant de les mettre dans un répertoire
node_moules => trop gros et inutile grâce à package.json
config => doit rester confidentiel

On regarde de nouveau pour vérifier les éléments du projets:
    git status

On ajoute tous les éléments (snapshot the file in preparation for versioning):
    git add .




*/

const express = require('express');
require('./db/mongoose');
const testRouter = require('./router/test');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();

// permet de parser les JSON entrants en 
app.use(express.json());

// routes
app.use(testRouter);
app.use(userRouter);
app.use(taskRouter);

// process.env.PORT => addresse de port pour Heroku
const port = process.env.PORT;

app.listen(port, () => {
    console.log("Server is up on port " + port);
});

