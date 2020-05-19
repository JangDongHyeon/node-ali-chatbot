"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataColRoomById = exports.chatDataColGet = exports.chatDataColRoom = exports.chatDataColFun = exports.chatSelectionsFun = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _DataColChat = _interopRequireDefault(require("../models/DataColChat"));

var _DataColRoom = _interopRequireDefault(require("../models/DataColRoom"));

var chatSelectionsFun = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var text, resopne;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            text = req.body.text;
            _context.next = 4;
            return new DataChat({
              text: text,
              user: req.user._id
            });

          case 4:
            _context.next = 6;
            return _axios["default"].post('http://155.230.24.126:3050/returnchatselections', {
              question: text
            });

          case 6:
            resopne = _context.sent;
            console.log(resopne.data);
            res.status(200).json(resopne.data);
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);
            res.status(500).json({
              msg: 'server error'
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function chatSelectionsFun(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.chatSelectionsFun = chatSelectionsFun;

var chatDataColFun = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var text, resopne;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            text = req.body.text;
            _context2.next = 4;
            return new DataChat({
              text: text,
              user: req.user._id
            });

          case 4:
            _context2.next = 6;
            return _axios["default"].post('http://155.230.24.126:3050/returnchatselections', {
              question: text
            });

          case 6:
            resopne = _context2.sent;
            console.log(resopne.data);
            res.status(200).json(resopne.data);
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            res.status(500).json({
              msg: 'server error'
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function chatDataColFun(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.chatDataColFun = chatDataColFun;

var chatDataColRoom = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var room;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return new _DataColRoom["default"]({
              user: req.user._id
            });

          case 3:
            room = _context3.sent;
            _context3.next = 6;
            return room.save();

          case 6:
            res.json(room._id);
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0.message);
            res.status(500).json({
              msg: 'server error'
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function chatDataColRoom(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.chatDataColRoom = chatDataColRoom;

var chatDataColGet = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var chat;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _DataColChat["default"].find({
              user: req.user._id,
              room: req.simsimroom._id
            }).sort({
              date: 1
            });

          case 3:
            chat = _context4.sent;
            res.json(chat);
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0.message);
            res.status(500).json({
              msg: 'server error'
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function chatDataColGet(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.chatDataColGet = chatDataColGet;

var dataColRoomById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next, id) {
    var room;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _DataColRoom["default"].findById(id);

          case 3:
            room = _context5.sent;

            if (!(!id.match(/^[0-9a-fA-F]{24}$/) || !room)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              msg: 'Room not found'
            }));

          case 6:
            req.dataCol = room;
            next();
            _context5.next = 14;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);
            return _context5.abrupt("return", res.status(400).json({
              msg: 'Server Error'
            }));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function dataColRoomById(_x9, _x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

exports.dataColRoomById = dataColRoomById;
//# sourceMappingURL=dataCol.js.map