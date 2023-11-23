const express = require('express');

const questionsControllers = require('../controllers/questions-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', questionsControllers.getQuestions);

router.post('/create', questionsControllers.createQuestion);

router.put('/update', questionsControllers.updateQuestionbyID);

router.deleteQuestionByID('/delete/:qid', questionsControllers.deleteQuestionByID);

module.exports = router;