const express = require('express');
const passport = require('passport');
const usersController = require('./controllers/usersController');
const contactsController = require('./controllers/contactsController');

require('./config/passport')(passport);

const router = express.Router();


router.post('/signin', usersController.signin);
router.post('/signup', usersController.signup);
router.get('/user/list', passport.authenticate('jwt', { session: false }), usersController.listAllUsers);
router.get('/dashboard/extract', passport.authenticate('jwt', { session: false }), usersController.extract);
router.get('/dashboard/balance', passport.authenticate('jwt', { session: false }), usersController.balance);
router.post('/dashboard/transfer', passport.authenticate('jwt', { session: false }), usersController.transfer);
router.post('/dashboard/deposit', passport.authenticate('jwt', { session: false }), usersController.deposit);
router.post('/dashboard/withdraw', passport.authenticate('jwt', { session: false }), usersController.withdraw);
router.get('/dashboard/contact/list', passport.authenticate('jwt', { session: false }), contactsController.listUserContact);
router.post('/dashboard/contact/create', passport.authenticate('jwt', { session: false }), contactsController.createContact);
router.post('/dashboard/contact/destroy', passport.authenticate('jwt', { session: false }), contactsController.destroyContact);

module.exports = router;
