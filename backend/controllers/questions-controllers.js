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
  
    const { question, bio, category, tweetURL } = req.body; // Assuming your request body contains 'question' and 'category'

    try {
        const newQuestion = new Question({ question, bio, category, tweetURL });
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion); // Send the created question as JSON response with a 201 status code
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create the question' });
    }
};

const updateQuestionbyID = async (req, res, next) => {
    const { id, ans } = req.body;
  
    try {
      // Find the question by qid in the questions collection
      const question = await Question.findOne({ _id: id });
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Now you have the specific question object
      // Update the question object with the answer
      question.answers.push(ans);
  
      // Save the updated question object
      await question.save();
  
      res.json({ message: 'Answer added to the question', question });
    } catch (error) {
      // Handle any errors that may occur during the process
      next(error);
    }
  };
  

exports.getQuestions = getQuestions;
exports.createQuestion = createQuestion;
exports.updateQuestionbyID = updateQuestionbyID;