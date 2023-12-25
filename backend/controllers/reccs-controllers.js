const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Recc = require('../models/reccs-model');

const getReccs = async (req, res, next) => {
    try {
        const reccs = await Recc.find({}); // Use the `find` method to get all reccs
        res.status(200).json({ reccs }); // Send the reccs as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve reccs' });
    }
}

const createRecc = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { topic, questions, links } = req.body;

    try {
        const newRecc = new Recc({ topic, questions, links });
        const savedRecc = await newRecc.save();

        res.status(201).json(savedRecc); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create the reccomendation' });
    }
};

exports.getReccs = getReccs;
exports.createRecc = createRecc;
