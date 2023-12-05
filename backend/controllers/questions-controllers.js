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
  
    let { question, bio, category, tweetboolean, tweetURL, contentboolean, contentURL, right, mid, left } = req.body; // Assuming your request body contains 'question' and 'category'

    category = category.split(',').map(cat => cat.trim());
    
    try {
        const newQuestion = new Question({ question, bio, category, tweetboolean, tweetURL, contentboolean, contentURL, right, mid, left, display: true });
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion); // Send the created question as JSON response with a 201 status code
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create the question' });
    }
};

const updateQuestionbyID = async (req, res, next) => {
    const { id, ans } = req.body; // id is not in body for this
  
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

const deleteQuestionByID = async (req, res, next) => {
  const questionId = req.params.qid;

  try {
      const result = await Question.deleteOne({ _id: questionId });

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
      const question = await Question.findById(questionId);
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
  let { question, bio, category, tweetboolean, tweetURL, contentboolean, contentURL, left, mid, right } = req.body;
  category = category.split(',').map(cat => cat.trim());
  try {
      // Blind update: the request body is assumed to contain all the necessary fields
      const updatedQuestion = await Question.findByIdAndUpdate(
          questionId,
          { question, bio, category, tweetboolean, tweetURL, contentboolean, contentURL, left, mid, right, display: true },
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
  

exports.getQuestions = getQuestions;
exports.createQuestion = createQuestion;
exports.updateQuestionbyID = updateQuestionbyID;
exports.getQuestionbyID = getQuestionbyID;
exports.updateFullQuestionbyID = updateFullQuestionbyID;
exports.deleteQuestionByID = deleteQuestionByID;

