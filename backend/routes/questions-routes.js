const express = require('express');

const questionsControllers = require('../controllers/questions-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', questionsControllers.getQuestions);

router.post('/create', questionsControllers.createQuestion);

router.put('/update', questionsControllers.updateQuestionbyID);

router.delete('/delete/:qid', questionsControllers.deleteQuestionByID);

router.get('/:qid', questionsControllers.getQuestionbyID);

router.put('/update/:qid', questionsControllers.updateFullQuestionbyID);

module.exports = router;