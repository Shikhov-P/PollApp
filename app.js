const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const pollRouter = require('./routes/poll');

const app = express();

require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/poll', pollRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Port started on port ${port}`);
});
