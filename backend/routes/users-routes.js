const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();



router.get('/', usersControllers.getUsers);

router.post('/signup', usersControllers.signup);

router.post('/login', usersControllers.login);

router.put('/update/:uemail', usersControllers.updateUserbyID);

router.get('/:uemail', usersControllers.getUserbyEmail);

router.put('/increasequestion/:uemail', usersControllers.increaseQuestionIndex);



module.exports = router;