const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth'); 
const sharp = require('sharp')
const upload = require('../middleware/upload')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router();


// route for user creation, async/await version:
router.post('/users', async (req, res) => {
    const user = new User(req.body); 
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

/*
// route for login => MÉTHODE 1
router.post('/users/login', async (req, res) => {
    try {        
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user: user.getPublicProfile(), token });
    } catch (e) {
        res.status(400).send();
    }
});
*/

// route for login => MÉTHODE 2
router.post('/users/login', async (req, res) => {
    try {        
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// Route pour le user avec token, Read profile. auth.js renvoie req.user grâce au 2ème arg 'auth' qui sert de middleware
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

// route for ONE user update:
router.patch('/users/me', auth, async(req, res) => {
    // ce que qqun veut mettre à jour:
    const updates = Object.keys(req.body);

    // ce qui correspond au schéma:
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    // allowedUpdates and updates comparison:
    const isValidOperation =  updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOperation) return res.status(400).send("error: 'Invalid updates!'");

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        
        res.send(req.user);
    } catch (e) {
        res.status(400).send();
    }
});

// route for deleting ONE user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

// avatar upload
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

// avatar delete
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

// fetch and get the avatar image
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send() 
    }
})

module.exports = router;
