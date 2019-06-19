const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Op } = require('sequelize');

const router = express.Router();
require('../config/passport')(passport);
const { Historic } = require('../models');
const { User } = require('../models');

const getToken = function getToken(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
    return null;
  }
  return null;
};


router.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.cpf || !req.body.phone) {
    res.status(400).send({ msg: 'Please pass all fields.' });
  } else {
    User
      .create({
        name: req.body.name,
        password: req.body.password,
        cpf: req.body.cpf,
        phone: req.body.phone,
      })
      .then(user => res.status(201).send(user))
      .catch((error) => {
        res.status(400).send(error);
      });
  }
});

router.post('/signin', (req, res) => {
  User
    .findOne({
      where: {
        cpf: req.body.cpf,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found.',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', { expiresIn: 86400 * 30 });
          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
      return true;
    })
    .catch(error => res.status(400).send(error));
});

router.get('/historic/extract', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const extract = await Historic.findAllFromUserId(req.user.dataValues.id);
    if (extract) { res.status(200).send(extract); }
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
  return true;
});

router.get('/historic/balance', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const extract = await Historic.balanceFromUserId(req.user.dataValues.id);
    if (extract) { res.status(200).send({ extract }); }
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
  return true;
});

router.post('/historic', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    Historic
      .create({
        value: req.body.value,
        senderId: req.user.dataValues.id,
        receiverId: req.body.receiverId,
      })
      .then(historic => res.status(201).send(historic))
      .catch(error => res.status(400).send(error));
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
  return true;
});

module.exports = router;
