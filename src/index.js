/*

On va ajouter la possibilité de mettre une photo pour chaque tâche




*/
const app = require('./app')

// process.env.PORT => addresse de port pour Heroku
const port = process.env.PORT;

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
