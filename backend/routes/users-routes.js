const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();



router.get('/', usersControllers.getUsers);

router.post('/signup', usersControllers.signup);

router.post('/login', usersControllers.login);

router.put('/update/:uid', usersControllers.updateUserbyID);

router.put('/increasequestion/:uid', usersControllers.increaseQuestionIndex);

router.put('/fullupdate/:uid', usersControllers.fullUserUpdate);

router.get('/getUserEmail/:id', usersControllers.getUserEmailById);

router.get('/getUserId/:email', usersControllers.getUserIdByEmail);

router.get('/:uemail', usersControllers.getUserbyEmail);

router.get('/:uid', usersControllers.getUserByID);



module.exports = router;