const express = require('express');

const dailyquestionsControllers = require('../controllers/dailyquestions-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', dailyquestionsControllers.getQuestions);
router.post('/create', dailyquestionsControllers.createQuestion);
router.put('/update', dailyquestionsControllers.updateQuestionbyID);
router.delete('/delete/:qid', dailyquestionsControllers.deleteQuestionByID);
router.get('/:qid', dailyquestionsControllers.getQuestionbyID);
router.put('/update/:qid', dailyquestionsControllers.updateFullQuestionbyID);
router.delete('/delete/:qid', dailyquestionsControllers.PermDelete);

module.exports = router;
