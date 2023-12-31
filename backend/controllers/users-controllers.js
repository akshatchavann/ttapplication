const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/users-model');
const mongoose = require('mongoose');

const getUsers = async (req, res, next) => {
    let users;
    try {
      users = await User.find({}, '-password');
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
  }; 

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { firstname, lastname, email, phoneNumber, password } = req.body;
  
    let existingUser
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    
    const createdUser = new User({
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      questions: [],
      answers: [],
      questionindex: 0,
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({user: createdUser.toObject({ getters: true })});
  };


const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
        'Logging in failed, please try again later.',
        500
        );
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
        'Invalid username or password, could not log you in.',
        401
        );
        return next(error);
    }

    res.json({message: 'Logged in!'});
};

const increaseQuestionIndex = async (req, res, next) => {
  const userId = req.params.uid; // Use 'uid' instead of 'uemail'

  try {
      // Find the user by ID and increment the questionindex by 1
      const updatedUser = await User.findByIdAndUpdate(
          userId, // Filter by user ID
          { $inc: { questionindex: 1 } }, // Increment operation
          { new: true } // Option to return the updated document
      );

      if (updatedUser) {
          res.status(200).json({
              message: "Question index increased successfully",
              user: updatedUser
          });
      } else {
          res.status(404).json({ message: "User not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error });
      next(error);
  }
};






const updateUserbyID = async (req, res, next) => {
  const userId = req.params.uid;
  const { questionId, answer } = req.body;

  try {
      if (!mongoose.Types.ObjectId.isValid(questionId)) {
          return res.status(400).json({ message: 'Invalid questionId' });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const qnaIndex = user.QnA.findIndex((qna) => qna.questionId.toString() === questionId);

      if (qnaIndex !== -1) {
          user.QnA[qnaIndex].answer = answer;
      } else {
          user.QnA.push({ questionId: new mongoose.Types.ObjectId(questionId), answer });
      }

      await user.save();
      res.json({ message: 'User QnA updated successfully', user: user });
  } catch (error) {
      next(error);
  }
};





const getUserbyEmail = async (req, res, next) => {
    const email = req.params.uemail;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            const error = new HttpError('Could not find a user for the provided email.', 404); // 404 is for resource not found
            return next(error);
        }

        res.json({ user: user.toObject({ getters: true }) });
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a user.', 500); // 500 is for a server error
        return next(error);
    }
}


const fullUserUpdate = async (req, res) => {
  const userId = req.params.uid; // Retrieve the user ID from the URL parameter
  const updatedData = req.body;

  try {
      // Find the user by ID and update
      const updatedUser = await User.findByIdAndUpdate(
          userId, // Use the user ID for finding the user
          updatedData, 
          { new: true } // Return the updated document
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' });
  }
};


const getUserIdByEmail = async (req, res, next) => {
  const email = req.params.email;

  try {
      const user = await User.findOne({ email: email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ userId: user.id }); // Or user._id depending on your schema
  } catch (err) {
      const error = new HttpError('Fetching user failed, please try again later.', 500);
      return next(error);
  }
};
  

const getUserEmailById = async (req, res, next) => {
  const userId = req.params.id;

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ email: user.email });
  } catch (err) {
      const error = new HttpError('Fetching user failed, please try again later.', 500);
      return next(error);
  }
};



const getUserByID = async (req, res, next) => {
  const userId = req.params.uid; // Retrieve the user ID from the URL parameter

  try {
      const user = await User.findById(userId).select('-password'); // Excluding the password for security

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user: user.toObject({ getters: true }) });
  } catch (err) {
      const error = new HttpError(
          'Fetching user failed, please try again later.',
          500
      );
      return next(error);
  }
};
  
exports.fullUserUpdate = fullUserUpdate;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.updateUserbyID = updateUserbyID;
exports.getUserbyEmail = getUserbyEmail;  
exports.increaseQuestionIndex = increaseQuestionIndex;
exports.getUserIdByEmail = getUserIdByEmail;
exports.getUserEmailById = getUserEmailById;
exports.getUserByID = getUserByID;
