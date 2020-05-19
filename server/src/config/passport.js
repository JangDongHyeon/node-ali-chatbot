"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passportJwt = require("passport-jwt");

var _User = _interopRequireDefault(require("../models/User"));

require('dotenv').config();

var opts = {};
opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = function (passport) {
  passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
    _User["default"].findById(jwt_payload._id).then(function (user) {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })["catch"](function (err) {
      return console.log(err);
    });
  }));
};
//# sourceMappingURL=passport.js.map