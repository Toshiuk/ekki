const express = require('express');

const passport = require('passport');
const usersController = require('./controllers/usersController');
const contactsController = require('./controllers/contactsController');

require('./config/passport')(passport);

const userPassport = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.post('/login', usersController.login);
router.post('/signup', usersController.signup);
router.get('/user/list', userPassport, usersController.listAllUsers);
router.get('/dashboard/extract', userPassport, usersController.extract);
router.get('/dashboard/balance', userPassport, usersController.balance);
router.post('/dashboard/transfer', userPassport, usersController.transfer);
router.post('/dashboard/deposit', userPassport, usersController.deposit);
router.post('/dashboard/withdraw', userPassport, usersController.withdraw);
router.get('/dashboard/contact/list', userPassport, contactsController.listUserContact);
router.post('/dashboard/contact/create', userPassport, contactsController.createContact);
router.post('/dashboard/contact/destroy', userPassport, contactsController.destroyContact);

module.exports = router;
