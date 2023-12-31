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


const updateQuestionbyID = async (req, res, next) => {
    const { questionId, userId, answer } = req.body; // Assuming you pass the user ID and their answer

    try {
        const question = await dailyquestionSchema.findOne({ _id: questionId });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Check if the user has already answered
        const existingAnswerIndex = question.answers.findIndex(a => a.userId.equals(userId));

        if (existingAnswerIndex !== -1) {
            // User has already answered, update their answer
            question.answers[existingAnswerIndex].answer = answer;
        } else {
            // User has not answered yet, add a new answer
            question.answers.push({ userId, answer });
        }

        await question.save();
        res.json({ message: 'Answer updated successfully', question });
    } catch (error) {
        next(error);
    }
};

exports.getQuestions = getQuestions;
exports.createQuestion = createQuestion;
exports.updateQuestionbyID = updateQuestionbyID;

