"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRead = exports.read = exports.userById = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var userById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next, id) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findById(id);

          case 3:
            user = _context.sent;

            if (!(!id.match(/^[0-9a-fA-F]{24}$/) || !user)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              msg: 'User not found'
            }));

          case 6:
            req.profile = user;
            next();
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            return _context.abrupt("return", res.status(400).json({
              msg: 'Server Error'
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function userById(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.userById = userById;

var read = function read(req, res) {
  req.profile.password = undefined;
  return res.json(req.profile);
};

exports.read = read;

var authRead = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log(req.user._id);
            _context2.next = 4;
            return _User["default"].findById(req.user._id);

          case 4:
            user = _context2.sent;
            user.password = undefined;
            res.json(user);
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            return _context2.abrupt("return", res.status(400).json({
              msg: 'server error'
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function authRead(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.authRead = authRead;
//# sourceMappingURL=user.js.map