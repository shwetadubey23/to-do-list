const express = require('express');
const { register, login, getAllUser, getMyProfile, logout } = require('../controller/userController');
const { authantication } = require('../middleware/auth');
const { newTask, getMyTask, deleteTask, updateTask } = require('../controller/taskController');

const router = express.Router()

router.post('/user', register);
router.post('/login', login);

router.get('/user/me', authantication, getMyProfile)

// router.get('/allUser', authantication, getAllUser)

router.get('/logout', logout)


router.post('/task', authantication, newTask)

router.get('/myTask', authantication, getMyTask)

router.put('/task/:id', authantication, updateTask)

router.delete('/task/:id', authantication, deleteTask)



// router.get('/userId/:id', getUser)

// router.put('/userId/:id', updateUser)

// router.delete('/userId/:id', deleteUser)

// if url is same but method is change the we can write like this

// router.route('/userId/:id').get(getUser).put(updateUser).delete(deleteUser)


module.exports = router
