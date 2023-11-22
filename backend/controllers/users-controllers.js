const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/users-model');

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
  const userEmail = req.params.uemail;
  try {
      // Find the user by email and increment the questionindex by 1
      const updatedUser = await User.findOneAndUpdate(
          { email: userEmail }, // Filter by email
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
  const uemail = req.params.uemail;
  const { qs, ans } = req.body;

  try {
    // Find the user by email or some unique identifier
    const user = await User.findOne({ email: uemail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the question already exists in the user's questions array
    const questionIndex = user.questions.findIndex((question) => question === qs);

    if (questionIndex !== -1) {
      // If the question exists, update its corresponding answer
      user.answers[questionIndex] = ans;
    } else {
      // If the question doesn't exist, add it to the user's questions and answers arrays
      user.questions.push(qs);
      user.answers.push(ans);
    }

    // Save the updated user data
    await user.save();

    res.json({ message: 'User QnA updated successfully', user: user });
  } catch (error) {
    // Handle any errors that may occur during the process
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


  
  

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.updateUserbyID = updateUserbyID;
exports.getUserbyEmail = getUserbyEmail;  
exports.increaseQuestionIndex = increaseQuestionIndex;