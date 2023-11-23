const express = require('express');

const questionsControllers = require('../controllers/questions-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', questionsControllers.getQuestions);

router.get('/:id', questionsControllers.getQuestionbyID);

router.post('/create', questionsControllers.createQuestion);

router.put('/update', questionsControllers.updateQuestionbyID);

router.put('/update/:id', questionsControllers.updateFullQuestionbyID)

router.delete('/delete/:id', questionsControllers.deleteQuestionByID);

module.exports = router;