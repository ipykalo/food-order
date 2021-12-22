const Meal = require('../models/meal');

exports.getMeals = (req, res) => {
  Meal.find()
    .then(meals => {
      console.log(meals)
      res.json(meals);
    })
}