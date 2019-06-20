const express = require('express');
const passport = require('passport');
const usersController = require('../controller/usersController');

require('../config/passport')(passport);

const router = express.Router();


router.post('/signin', usersController.signin);
router.post('/signup', usersController.signup);
router.get('/dashboard/extract', passport.authenticate('jwt', { session: false }), usersController.extract);
router.get('/dashboard/balance', passport.authenticate('jwt', { session: false }), usersController.balance);
router.post('/dashboard/transfer', passport.authenticate('jwt', { session: false }), usersController.transfer);
router.post('/dashboard/deposit', passport.authenticate('jwt', { session: false }), usersController.deposit);
router.post('/dashboard/withdraw', passport.authenticate('jwt', { session: false }), usersController.withdraw);

module.exports = router;
