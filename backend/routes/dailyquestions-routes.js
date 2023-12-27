const express = require('express');

const dailyquestionsControllers = require('../controllers/dailyquestions-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', dailyquestionsControllers.getQuestions);
router.get('/create', dailyquestionsControllers.createQuestion);

module.exports = router;
