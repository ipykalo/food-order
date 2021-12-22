const express = require('express');
const app = express();

app.use(require('./routes/meals'));

app.listen(process.env.PORT || 4000, () => console.log("Server is runing..."));