// création d'un schéma/modèle pour task
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    picture: {
        type: Buffer
    }
}, {
    timestamps: true
});

// tri les data de retour 
taskSchema.methods.toJSON  = function() {
    const task = this;
    const taskObject = task.toObject();

    delete taskObject.picture;

    return taskObject;
};

const Task = new mongoose.model('Tasks', taskSchema);

module.exports = Task;