const jwt = require('jsonwebtoken');
const { Contact, User } = require('../models');


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
  async listUserContact(req, res) {
    const token = getToken(req.headers);
    let response = '';
    if (token) {
      response = await Contact.findAll({
        where: { userId: req.user.dataValues.id },
        include: [
          {
            model: User,
            as: 'contact',
            attributes: ['name'],
          },
        ],
      });
    }
    return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
  },

  async createContact(req, res) {
    const token = getToken(req.headers);
    let response = '';
    if (token) {
      response = await Contact.add(req.user.dataValues.id, req.body.contactId);
    }
    return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
  },
  async destroyContact(req, res) {
    const token = getToken(req.headers);
    let response = '';
    if (token) {
      response = await Contact.destroy(req.user.dataValues.id, req.body.contactId);
    }
    return res.status(201).send(response) || res.status(403).send({ success: false, msg: 'Unauthorized.' });
  },

};
