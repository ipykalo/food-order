const Order = require('../models/order');

exports.createOrder = (req, res) => {
  console.log(req.body)
  const order = new Order({
    name: req.body.name,
    city: req.body.city,
    street: req.body.street,
    postal: req.body.postal,
    order: req.body.order
  });

  console.log(order);
  order.save()
    .then(resp => {
      console.log(resp);
      res.send('Success!')
    });
}