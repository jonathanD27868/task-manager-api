const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();


// route for tasks creation:
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    }
});

// route for MULTIPLE tasks reading:
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === "true"
    }
    if(req.query.sortBy){        
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send();
    }
});

// route for ONE task reading:
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if(!task) return res.status(404).send();
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

// route for ONE task update:
router.patch('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id;

    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidUpdates = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidUpdates) return res.status(400).send("error: 'Invalid updates!'");

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        
        if(!task) return res.status(404).send();

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

// delete 1 task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if(!task) return res.status(404).send();
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
