const express = require('express');
const mongoose = require('mongoose');
const keys = require('./keys');

mongoose.Promise = global.Promise;
mongoose
    .connect(keys.mongoURI)
    .then(() => console.log('Connected to the DB'))
    .catch(err => console.log(err));
