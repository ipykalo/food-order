const express = require('express');
const mealsController = require('../controllers/meals');

const router = express.Router();

router.get('/meals', mealsController.getMeals);

module.exports = router;