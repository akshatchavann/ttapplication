const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const dailyquestionSchema = require('../models/dailyquestions-model');

const getQuestions = async (req, res, next) => {
    try {
        const questions = await dailyquestionSchema.find({}); // Use the `find` method to get all questions
        res.status(200).json({ questions }); // Send the questions as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve questions' });
    }
};



exports.getQuestions = getQuestions;

