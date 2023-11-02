const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Question = require('../models/questions-model');

const getQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find({}); // Use the `find` method to get all questions
        res.status(200).json({ questions }); // Send the questions as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve questions' });
    }
};

const createQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { question, category } = req.body; // Assuming your request body contains 'question' and 'category'

    try {
        const newQuestion = new Question({ question, category });
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion); // Send the created question as JSON response with a 201 status code
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create the question' });
    }
};

exports.getQuestions = getQuestions;
exports.createQuestion = createQuestion;