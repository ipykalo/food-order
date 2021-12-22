const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.use(require('./routes/meals'));

app.use((error, req, res, next) => {
  if (error) {
    console.log(error, 'catched error')
    res.status(500).json({
      error,
      msg: 'Server Failed'
    });
  }
  next();
});

const DB_URL = 'mongodb+srv://ipyka:12457800@cluster0.toaib.mongodb.net/meals?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => console.log("Server is runing..."));
  })
  .catch(err => console.log(err, 'DB conaction failed.'));
