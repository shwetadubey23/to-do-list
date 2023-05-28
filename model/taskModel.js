const mongoose = require('mongoose');
const userModel = require('../model/userModel');

const ObjectId = mongoose.Schema.Types.ObjectId

const taskSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    userModel: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Task", taskSchema)