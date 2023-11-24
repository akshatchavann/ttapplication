const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Recc = require('../models/reccs-model');

const getReccs = async (req, res, next) => {
    res.send('Hello World!')
}


exports.getReccs = getReccs;