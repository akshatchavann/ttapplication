const express = require('express');

const reccsControllers = require('../controllers/reccs-controllers');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', reccsControllers.getReccs);
router.post('/create', reccsControllers.createRecc);

module.exports = router;