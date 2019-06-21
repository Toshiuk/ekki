const jwt = require('jsonwebtoken');

const { Historic } = require('../models');
const { User } = require('../models');
const { getToken } = require('../helpers/token');


const signup = (req, res) => {
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
};

const signin = (req, res) => {
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
};

const listAllUsers = async (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const allUsers = await User.findAll();
    if (allUsers) { res.status(200).send(allUsers); }
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
  return res.status(201).send({ success: true, msg: 'No users found.' });
};

const extract = async (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const extractUser = await Historic.findAllFromUserId(req.user.dataValues.id);
    if (extractUser) { res.status(200).send(extractUser); }
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
  return res.status(201).send({ success: true, msg: 'No extract found.' });
};

const balance = async (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const balanceUser = await Historic.balanceFromUserId(req.user.dataValues.id);
    if (balanceUser) { res.status(200).send({ balanceUser }); }
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
  return res.status(201).send({ success: true, msg: 'No balance found.' });
};

const transfer = async (req, res) => {
  const token = getToken(req.headers);
  let response = '';
  if (token) {
    response = await User.transfer(req.user.dataValues, req.body.receiverId, req.body.value);
  }
  return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
};

const deposit = async (req, res) => {
  const token = getToken(req.headers);
  let response = '';
  if (token) {
    response = await User.deposit(req.user.dataValues, req.body.value);
  }
  return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
};

const withdraw = async (req, res) => {
  const token = getToken(req.headers);
  let response = '';
  if (token) {
    response = await User.withdraw(req.user.dataValues, req.body.value);
  }
  return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
};

module.exports = {
  signup,
  signin,
  listAllUsers,
  extract,
  balance,
  transfer,
  deposit,
  withdraw,
};
