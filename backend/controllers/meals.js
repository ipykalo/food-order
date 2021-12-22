const Meal = require('../models/meal');
const helper = require('../util/helper');

exports.getMeals = (req, res, next) => {
  Meal.find({})
    .then(meals => {
      res.json(meals);
    })
    .catch(err => next(helper.logError(err, 'getMeals')));
}