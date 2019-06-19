const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
require('../config/passport')(passport);
const Historic = require('../models').Historic;
const User = require('../models').User;


router.post('/signup', function (req, res) {
    console.log(req.body);
    if (!req.body.name || !req.body.password || !req.body.cpf || !req.body.phone) {
        res.status(400).send({ msg: 'Please pass all fields.' })
    } else {
        User
            .create({
                name: req.body.name,
                password: req.body.password,
                cpf: req.body.cpf,
                phone: req.body.phone
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    }
});

router.post('/signin', function (req, res) {
    User
        .findOne({
            where: {
                cpf: req.body.cpf
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    message: 'Authentication failed. User not found.',
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', { expiresIn: 86400 * 30 });
                    jwt.verify(token, 'nodeauthsecret', function (err, data) {
                        console.log(err, data);
                    })
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            })
        })
        .catch((error) => res.status(400).send(error));
});

router.get('/historic', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        Historic
            .findAll()
            .then((historics) => res.status(200).send(historics))
            .catch((error) => { res.status(400).send(error); });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

router.post('/historic', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        Historic
            .create({
                value: req.body.value,
                senderId: req.body.senderId,
                receiverId: req.body.receiverId
            })
            .then((historic) => res.status(201).send(historic))
            .catch((error) => res.status(400).send(error));
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;