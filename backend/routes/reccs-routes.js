const express = require('express');

const reccsControllers = require('../controllers/reccs-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', reccsControllers.getReccs);


module.exports = router;