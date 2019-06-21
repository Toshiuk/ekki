const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const { User } = require('../models');

module.exports = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  passport.use('jwt', new JwtStrategy(opts, ((jwt_payload, done) => {
    User
      .findByPk(jwt_payload.id)
      .then(user => done(null, user))
      .catch(error => done(error, false));
  })));
};
