const express = require('express');

const dailyquestionsControllers = require('../controllers/dailyquestions-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', dailyquestionsControllers.getQuestions);

module.exports = router;