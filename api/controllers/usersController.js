const jwt = require('jsonwebtoken');

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


module.exports = {
  signup(req, res) {
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
  },

  signin(req, res) {
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
  },
  async listAllUsers(req, res) {
    const token = getToken(req.headers);
    if (token) {
      const allUsers = await User.findAll();
      if (allUsers) { res.status(200).send(allUsers); }
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
    return res.status(201).send({ success: true, msg: 'No users found.' });
  },

  async extract(req, res) {
    const token = getToken(req.headers);
    if (token) {
      const extract = await Historic.findAllFromUserId(req.user.dataValues.id);
      if (extract) { res.status(200).send(extract); }
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
    return res.status(201).send({ success: true, msg: 'No extract found.' });
  },
  async balance(req, res) {
    const token = getToken(req.headers);
    if (token) {
      const balance = await Historic.balanceFromUserId(req.user.dataValues.id);
      if (balance) { res.status(200).send({ balance }); }
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
    return res.status(201).send({ success: true, msg: 'No balance found.' });
  },
  async transfer(req, res) {
    const token = getToken(req.headers);
    let response = '';
    if (token) {
      response = await User.transfer(req.user.dataValues, req.body.receiverId, req.body.value);
    }
    return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
  },
  async deposit(req, res) {
    const token = getToken(req.headers);
    let response = '';
    if (token) {
      response = await User.deposit(req.user.dataValues, req.body.value);
    }
    return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
  },
  async withdraw(req, res) {
    const token = getToken(req.headers);
    let response = '';
    if (token) {
      response = await User.withdraw(req.user.dataValues, req.body.value);
    }
    return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
  },

};
