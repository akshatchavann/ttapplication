const express = require('express');

const dailyquestionsControllers = require('../controllers/dailyquestions-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', dailyquestionsControllers.getQuestions);
router.post('/create', dailyquestionsControllers.createQuestion);
router.put('/update', dailyquestionsControllers.updateQuestionbyID);

module.exports = router;
