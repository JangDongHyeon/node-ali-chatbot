"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simsimRoomById = exports.chatSimSimGet = exports.chatSimSimRoom = exports.chatSimSimFun = exports.chatSelectionsFun = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _axios = _interopRequireDefault(require("axios"));

var _SimSimChat = _interopRequireDefault(require("../models/SimSimChat"));

var _SimSimRoom = _interopRequireDefault(require("../models/SimSimRoom"));

var _chatbot = require("../middlewares/chatbot");

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

var chatSimSimFun = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var text, request, resopne, simChat, resultList, res1, simsim, chat, reqChat, reqFinal, roomNumber;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            text = req.body.text;
            request = {
              roomState: '2',
              roomId: '999',
              sentence: text
            };
            resopne = '';
            resultList = new Array();
            console.log(req.simsimroom);
            _context2.next = 8;
            return new _SimSimChat["default"]({
              text: text,
              user: req.user._id,
              room: req.simsimroom._id
            });

          case 8:
            simsim = _context2.sent;
            _context2.next = 11;
            return simsim.save();

          case 11:
            resultList.push(simsim); // const serviceFilter = await filterKrFinlter(request);
            // console.log('setTtsCheck:', serviceFilter);
            // if (serviceFilter == '1') resopne = 'https://www.google.com/maps/';
            // if (serviceFilter == '2') resopne = 'https://www.youtube.com';
            // if (serviceFilter == '3') resopne = 'https://mail.google.com';
            // if (serviceFilter == '4') resopne = 'https://www.google.com/calendar';
            // if (serviceFilter == '5') resopne = 'https://contacts.google.com';
            // if (serviceFilter == '7') resopne = 'https://www.weather.go.kr/w/weather/today.do';
            // if (serviceFilter == '15') resopne = 'https://movie.naver.com';
            // else {

            _context2.next = 14;
            return _SimSimChat["default"].find({
              user: req.user._id,
              room: req.simsimroom,
              filterCh: false
            }).sort({
              id: -1
            }).limit(5).select('text -_id');

          case 14:
            chat = _context2.sent;
            console.log(chat);
            chat.reverse();
            console.log(chat);
            reqChat = chat.map(function (result, i, arr) {
              if (arr.length - 1 === i) {
                return result.text;
              } else if (i === 0) {
                return '>' + result.text + '\n>';
              } else return result.text + '\n>';
            });
            reqFinal = '';
            reqChat.forEach(function (item) {
              reqFinal += item;
            });
            roomNumber = Number(req.simsimroom.id);
            _context2.next = 24;
            return _axios["default"].post('http://155.230.24.126:3050/returnchatresponse', {
              sender: 'user',
              question: reqFinal,
              roomNumber: roomNumber
            });

          case 24:
            res1 = _context2.sent;
            console.log(res1.data); //  }
            // if (res1) {
            //     simChat = await new SimSim({
            //         text: res1.data.response,
            //         user: req.user._id,
            //         room: req.simsimroom._id,
            //         bot: true,
            //     });
            // } else {
            //     simChat = await new SimSim({
            //         text: resopne,
            //         user: req.user._id,
            //         room: req.simsimroom._id,
            //         bot: true,
            //         filterCh: true,
            //     });
            // }

            if (!(res1.data.response.indexOf('https') != -1)) {
              _context2.next = 32;
              break;
            }

            _context2.next = 29;
            return new _SimSimChat["default"]({
              text: res1.data.response,
              user: req.user._id,
              room: req.simsimroom._id,
              bot: true,
              filterCh: true
            });

          case 29:
            simChat = _context2.sent;
            _context2.next = 35;
            break;

          case 32:
            _context2.next = 34;
            return new _SimSimChat["default"]({
              text: res1.data.response,
              user: req.user._id,
              room: req.simsimroom._id,
              bot: true
            });

          case 34:
            simChat = _context2.sent;

          case 35:
            _context2.next = 37;
            return simChat.save();

          case 37:
            resultList.push(simChat);
            res.status(200).json(resultList);
            _context2.next = 45;
            break;

          case 41:
            _context2.prev = 41;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            res.status(500).json({
              msg: 'server error'
            });

          case 45:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 41]]);
  }));

  return function chatSimSimFun(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.chatSimSimFun = chatSimSimFun;

var chatSimSimRoom = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var room;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return new _SimSimRoom["default"]({
              title: 'parseon',
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

  return function chatSimSimRoom(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.chatSimSimRoom = chatSimSimRoom;

var chatSimSimGet = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var chat;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _SimSimChat["default"].find({
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

  return function chatSimSimGet(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.chatSimSimGet = chatSimSimGet;

var simsimRoomById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next, id) {
    var room;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _SimSimRoom["default"].findById(id);

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
            req.simsimroom = room;
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

  return function simsimRoomById(_x9, _x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

exports.simsimRoomById = simsimRoomById;
//# sourceMappingURL=dataChat.js.map