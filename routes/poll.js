const express = require('express');
const Pusher = require('pusher');
const router = express.Router();
const keys = require('../config/keys');

const Choice = require('../models/choice');

const pusher = new Pusher({
    appId: keys.pusherAppId,
    key: keys.pusherKey,
    secret: keys.pusherSecret,
    cluster: keys.pusherCluster,
    encrypted: keys.pusherEncrypted
});

router.get('/', (req, res) => {
    Choice.find()
        .then(choices => res.json({
            success: true,
            choices: choices
        }));
});

router.post('/', (req, res) => {
    const choice = {
        os: req.body.os,
        points: 1
    };

    new Choice(choice)
        .save()
        .then(choice => {
            pusher.trigger('poll', 'submit', {
                points: parseInt(choice.points),
                os: choice.os
            });
            return res.json({success: true, message: 'Poll submitted'});
        })
        .catch();



});

module.exports = router;
