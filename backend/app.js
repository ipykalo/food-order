const express = require('express');
const mongoose = require('mongoose');
const app = express();
const checkToken = require('./middlware/check-token');

require('dotenv').config();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(require('./routes/user'));
app.use(checkToken, require('./routes/meals'));
app.use(checkToken, require('./routes/order'));

app.use((error, req, res, next) => {
  if (error) {
    console.log(error, 'catched error')
    res.status(500).json({
      error,
      message: 'Server Failed'
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
