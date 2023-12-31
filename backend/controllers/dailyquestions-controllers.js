const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const dailyquestionSchema = require('../models/dailyquestions-model');
const User = require('../models/users-model');


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
        // First, check if the user exists
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Then, find the question
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




const deleteQuestionByID = async (req, res, next) => {
    const questionId = req.params.qid;
  
    try {
        const result = await dailyquestionSchema.deleteOne({ _id: questionId });
  
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Question not found' });
        }
  
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ 
            message: 'Failed to delete the question', 
            error: error.message 
        });
    }
  };


  const getQuestionbyID = async (req, res, next) => {
    const questionId = req.params.qid; // Get the ID from the request parameters
  
    try {
        const question = await dailyquestionSchema.findById(questionId);
        if (!question) {
            throw new HttpError('Could not find a question for the provided id.', 404);
        }
        res.json({ question: question.toObject({ getters: true }) }); // Convert to plain object and add `id` getter
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not find a question.',
            500
        );
        return next(err);
    }
  };
  
  
  const updateFullQuestionbyID = async (req, res, next) => {
    const questionId = req.params.qid;
    let { question, bio, category, tweetboolean, tweetURL, contentboolean, contentURL, left, mid, right,display, creator } = req.body;
    category = category.split(',').map(cat => cat.trim());
    try {
        // Blind update: the request body is assumed to contain all the necessary fields
        const updatedQuestion = await dailyquestionSchema.findByIdAndUpdate(
            questionId,
            { question, bio, category, tweetboolean, tweetURL, contentboolean, contentURL, left, mid, right, display, creator},
            { new: true, runValidators: true }
        );
  
        if (!updatedQuestion) {
            throw new HttpError('Could not find a question for the provided id.', 404);
        }
  
        res.status(200).json({ question: updatedQuestion.toObject({ getters: true }) });
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not update the question.',
            500
        );
        return next(err);
    }
  };



const PermDelete = async (req, res, next) => {
    const questionId = req.params.qid;
  
    try {
        const result = await dailyquestionSchema.deleteOne({ _id: questionId });
  
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Question not found' });
        }
  
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ 
            message: 'Failed to delete the question', 
            error: error.message 
        });
    }
  };


exports.getQuestions = getQuestions;
exports.createQuestion = createQuestion;
exports.updateQuestionbyID = updateQuestionbyID;
exports.deleteQuestionByID = deleteQuestionByID;
exports.getQuestionbyID = getQuestionbyID;
exports.updateFullQuestionbyID = updateFullQuestionbyID;
exports.PermDelete = PermDelete;

