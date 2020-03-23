const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        // récup du token dans le header en supprimant l'entête
        const token = req.header('Authorization').replace('Bearer ', '');

        // vérif du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // cherche le user avec _id et on vérifie si son token est bien ds le tab des token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        
        if(!user) throw new Error();

        // donne acces au user récupéré et son token dans le root handler:
        req.token = token;
        req.user = user;
        next();
        
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." });
    }
};

module.exports = auth;
