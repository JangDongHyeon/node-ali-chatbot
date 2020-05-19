"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

// to generate signed token
// for authorization check
_dotenv["default"].config();

exports.signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userFind, user, salt, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 3:
            userFind = _context.sent;
            console.log(userFind);
            console.log(req.body.email);

            if (!userFind) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: 'User use email'
            }));

          case 8:
            user = new _User["default"](req.body);
            _context.next = 11;
            return _bcryptjs["default"].genSalt(10);

          case 11:
            salt = _context.sent;
            _context.next = 14;
            return _bcryptjs["default"].hash(user.password, salt);

          case 14:
            user.password = _context.sent;
            _context.next = 17;
            return user.save();

          case 17:
            token = _jsonwebtoken["default"].sign({
              _id: user._id
            }, process.env.JWT_SECRET);
            res.cookie('t', token, {
              expire: new Date() + 9999
            });
            user.password = undefined;
            return _context.abrupt("return", res.json({
              token: 'Bearer ' + token,
              user: user
            }));

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);
            res.status(500).json({
              msg: "server error"
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, email, password, user, isMatch, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            //find the user based on email
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: 'User with that email does not exist. Please Signup'
            }));

          case 7:
            _context2.next = 9;
            return _bcryptjs["default"].compare(password, user.password);

          case 9:
            isMatch = _context2.sent;

            if (!isMatch) {
              res.status(400).json({
                msg: 'Email and Password dont match'
              });
            }

            token = _jsonwebtoken["default"].sign({
              _id: user._id
            }, process.env.JWT_SECRET);
            res.cookie('t', token, {
              expire: new Date() + 9999
            });
            user.password = undefined;
            res.json({
              token: 'Bearer ' + token,
              user: user
            });
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            res.status(500).json({
              msg: "server error"
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signout = function (req, res) {
  try {
    res.clearCookie('t');
    res.json({
      msg: 'Signout success'
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      msg: 'Server Error'
    });
  }
};

exports.requireSignin = (0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
});

exports.isAuth = function (req, res, next) {
  try {
    var user = req.profile && req.user && req.profile._id.toString() === req.user._id.toString();

    if (!user) {
      return res.status(403).json({
        msg: 'Access denid'
      });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      msg: 'Server Error'
    });
  }
};
//# sourceMappingURL=auth.js.map