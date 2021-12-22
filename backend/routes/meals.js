const express = require('express');
const router = express.Router();
const mealsController = require('../controllers/meals');

router.get('/meals', mealsController.getMeals);

module.exports = router;