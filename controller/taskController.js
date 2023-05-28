const taskModel = require('../model/taskModel')
const userModel = require('../model/userModel');


const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await taskModel.create({ title, description, userModel: req.user })
        res.status(201).send({ success: true, message: "Task added Successfully" })

    } catch (error) {
        return res.status(500).send({ success: false, error: error.message })
    }

};


const getMyTask = async (req, res) => {

    try {
        const userId = req.user._id;
        const userTask = await taskModel.find({ userModel: userId })
        res.status(200).send({ success: true, data: userTask })

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    };

};


const updateTask = async (req, res) => {

    try {
        const id = req.params.id
        const task = await taskModel.findById(id)
        
        if(!task) 
        return res.status(404).send({status: false, msg: "No Task Found"})
        task.isCompleted = !task.isCompleted
        task.save();

        res.status(200).send({ success: true, msg: "Task Updated" })

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


const deleteTask = async (req, res) => {
    try {

        const id = req.params.id
        const task = await taskModel.findById(id)
       if(!task) 
       return res.status(404).send({status: false, msg: "No Task Found"})
        await task.deleteOne();

        res.status(200).send({ success: true, msg: "Task Deleted" })

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


module.exports = { newTask, getMyTask, deleteTask, updateTask }