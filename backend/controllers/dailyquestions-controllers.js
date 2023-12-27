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
const createQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    let { question, bio, category, tweetboolean, tweetURL, contentboolean, contentURL, right, mid, left,creator } = req.body; // Assuming your request body contains 'question' and 'category'

    category = category.split(',').map(cat => cat.trim());
    
    try {
        const newQuestion = new dailyquestionSchema({ question, bio, category, tweetboolean, tweetURL, contentboolean, contentURL,creator, right, mid, left, display: true });
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion); // Send the created question as JSON response with a 201 status code
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create the question' });
    }
};


exports.getQuestions = getQuestions;
exports.createQuestion = createQuestion;

