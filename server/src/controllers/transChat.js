"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modeUpdate = exports.deleteUser = exports.userJoin = exports.getUser = exports.transSend = exports.send = exports.photo = exports.createRoom = exports.updateClub = exports.deleteRoom = exports.rooms = exports.getRoom = exports.transRoomById = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _formidable = _interopRequireDefault(require("formidable"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _TransChat = _interopRequireDefault(require("../models/TransChat"));

var _TransRoom = _interopRequireDefault(require("../models/TransRoom"));

var _TransUser = _interopRequireDefault(require("../models/TransUser"));

var _trans = require("../middlewares/trans");

var transRoomById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next, id) {
    var room;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _TransRoom["default"].findById(id);

          case 3:
            room = _context.sent;

            if (!(!id.match(/^[0-9a-fA-F]{24}$/) || !room)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              msg: 'Room not found'
            }));

          case 6:
            req.transRoom = room;
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

  return function transRoomById(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.transRoomById = transRoomById;

var getRoom = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var chats, club, chat, transUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _TransRoom["default"].findById(req.transRoom._id).populate('users', '_id name').populate('classmonitor', '_id name');

          case 3:
            club = _context2.sent;
            _context2.next = 6;
            return _TransChat["default"].find({
              room: req.transRoom._id
            }).populate('user', '_id name photo').sort({
              date: 1
            });

          case 6:
            chat = _context2.sent;

            if (!(!req.params.transRoomId.match(/^[0-9a-fA-F]{24}$/) || !club)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              msg: 'Club not found'
            }));

          case 9:
            _context2.next = 11;
            return _TransUser["default"].findOne({
              user: req.user._id,
              room: req.transRoom._id
            });

          case 11:
            transUser = _context2.sent;
            _context2.next = 14;
            return (0, _trans.transPromi)(chat, transUser.trans);

          case 14:
            chats = _context2.sent;
            res.json({
              club: club,
              chat: chats,
              mode: transUser
            });
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0.message);
            return _context2.abrupt("return", res.status(400).json({
              msg: 'server error'
            }));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function getRoom(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getRoom = getRoom;

var rooms = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _rooms;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _TransRoom["default"].find().populate('users', '_id name').populate('classmonitor', '_id name').sort({
              created: -1
            });

          case 3:
            _rooms = _context3.sent;
            res.json(_rooms);
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            return _context3.abrupt("return", res.status(400).json({
              msg: 'Server Error'
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function rooms(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.rooms = rooms;

var deleteRoom = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var club;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _TransRoom["default"].findById(req.transRoom._id);

          case 3:
            club = _context4.sent;

            if (!(!req.params.transRoomId.match(/^[0-9a-fA-F]{24}$/) || !club)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              msg: 'Club not found'
            }));

          case 6:
            _context4.next = 8;
            return _axios["default"]["delete"]("http://155.230.24.126:4500/api/chatbot/en/".concat(club.id));

          case 8:
            _context4.next = 10;
            return club.remove();

          case 10:
            res.json({
              msg: 'Club deleted successfully'
            });
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            return _context4.abrupt("return", res.status(400).json({
              msg: 'Server Error'
            }));

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function deleteRoom(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteRoom = deleteRoom;

var updateClub = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var form;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            form = new _formidable["default"].IncomingForm();
            form.keepExtensions = true;
            form.parse(req, /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err, fields, files) {
                var user;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!err) {
                          _context5.next = 2;
                          break;
                        }

                        return _context5.abrupt("return", res.status(400).json({
                          msg: 'Image could not be uploaded'
                        }));

                      case 2:
                        _context5.next = 4;
                        return _TransUser["default"].findOne({
                          user: req.user._id,
                          room: req.transRoom._id
                        });

                      case 4:
                        user = _context5.sent;

                        if (!user) {
                          res.status(400).json({
                            msg: 'Invalid Credntials'
                          });
                        }

                        _context5.next = 8;
                        return _lodash["default"].extend(user, fields);

                      case 8:
                        user = _context5.sent;
                        res.json(user);

                      case 10:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x13, _x14, _x15) {
                return _ref6.apply(this, arguments);
              };
            }());
            _context6.next = 10;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);
            return _context6.abrupt("return", res.status(400).json({
              msg: 'Server Error'
            }));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 6]]);
  }));

  return function updateClub(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateClub = updateClub;

var createRoom = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var form;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            form = new _formidable["default"].IncomingForm();
            form.keepExtensions = true;
            form.parse(req, /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err, fields, files) {
                var club;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!err) {
                          _context7.next = 2;
                          break;
                        }

                        return _context7.abrupt("return", res.status(400).json({
                          msg: 'Image could not be uploaded'
                        }));

                      case 2:
                        _context7.next = 4;
                        return new _TransRoom["default"](fields);

                      case 4:
                        club = _context7.sent;
                        club.users.push(req.user._id);
                        club.classmonitor = req.user._id;

                        if (files.photo) {
                          club.photo.data = _fs["default"].readFileSync(files.photo.path);
                          club.photo.contentType = files.photo.type;
                        }

                        _context7.next = 10;
                        return club.save();

                      case 10:
                        _context7.next = 12;
                        return _axios["default"].post('http://155.230.24.126:4500/api/chatbot/en', {
                          roomId: Number(club.id)
                        });

                      case 12:
                        res.json(club);

                      case 13:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x18, _x19, _x20) {
                return _ref8.apply(this, arguments);
              };
            }());
            _context8.next = 10;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8["catch"](0);
            console.error(_context8.t0);
            return _context8.abrupt("return", res.status(400).json({
              msg: 'Server Error'
            }));

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 6]]);
  }));

  return function createRoom(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

exports.createRoom = createRoom;

var photo = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var club;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _TransRoom["default"].findById(req.transRoom._id);

          case 2:
            club = _context9.sent;

            if (!club.photo.data) {
              _context9.next = 8;
              break;
            }

            res.set('Content-Type', club.photo.contentType);
            return _context9.abrupt("return", res.send(club.photo.data));

          case 8:
            res.json('err');

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function photo(_x21, _x22, _x23) {
    return _ref9.apply(this, arguments);
  };
}();

exports.photo = photo;

var send = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var club, resultList, text, responeSentiment, chat, pattern_eng, result, user;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _TransRoom["default"].findById(req.transRoom._id);

          case 3:
            club = _context10.sent;
            resultList = new Array();

            if (!(!req.params.transRoomId.match(/^[0-9a-fA-F]{24}$/) || !club)) {
              _context10.next = 7;
              break;
            }

            return _context10.abrupt("return", res.status(404).json({
              msg: 'Club not found'
            }));

          case 7:
            text = req.body.text;
            //sentiment
            pattern_eng = /[a-zA-Z]/;

            if (!pattern_eng.test(text)) {
              _context10.next = 15;
              break;
            }

            _context10.next = 12;
            return _axios["default"].post('http://155.230.24.126:4500/api/chatbot/sentiment', {
              sentence: text,
              language: 'en',
              roomId: club.id
            });

          case 12:
            responeSentiment = _context10.sent;
            _context10.next = 18;
            break;

          case 15:
            _context10.next = 17;
            return _axios["default"].post('http://155.230.24.126:4500/api/chatbot/sentiment', {
              sentence: text,
              language: 'kr',
              roomId: club.id
            });

          case 17:
            responeSentiment = _context10.sent;

          case 18:
            _context10.next = 20;
            return new _TransChat["default"]({
              text: text,
              sentiment: responeSentiment.data.sentiment
            });

          case 20:
            chat = _context10.sent;
            chat.user = req.user._id;
            chat.room = req.transRoom._id;
            _context10.next = 25;
            return chat.save();

          case 25:
            _context10.next = 27;
            return _TransChat["default"].findOne({
              _id: chat._id
            }).populate('user', '_id name').sort({
              date: 1
            });

          case 27:
            chat = _context10.sent;
            _context10.next = 30;
            return _TransUser["default"].findOne({
              user: req.user._id,
              room: req.transRoom._id
            });

          case 30:
            user = _context10.sent;
            _context10.next = 33;
            return (0, _trans.trans)(text, user.trans);

          case 33:
            chat.text = _context10.sent;
            resultList.push(chat);
            return _context10.abrupt("return", res.status(200).json(resultList));

          case 38:
            _context10.prev = 38;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0.message);
            res.status(400).json({
              msg: 'server error'
            });

          case 42:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 38]]);
  }));

  return function send(_x24, _x25) {
    return _ref10.apply(this, arguments);
  };
}();

exports.send = send;

var transSend = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var _req$body, chatId, text, resultList, transUser, chat;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _req$body = req.body, chatId = _req$body.chatId, text = _req$body.text;
            resultList = new Array();
            _context11.next = 5;
            return _TransUser["default"].findOne({
              user: req.user._id,
              room: req.transRoom._id
            });

          case 5:
            transUser = _context11.sent;
            _context11.next = 8;
            return _TransChat["default"].findOne({
              _id: chatId
            }).populate('user', '_id name').sort({
              date: 1
            });

          case 8:
            chat = _context11.sent;
            _context11.next = 11;
            return (0, _trans.trans)(text, transUser.trans);

          case 11:
            chat.text = _context11.sent;
            resultList.push(chat);
            return _context11.abrupt("return", res.status(200).json(resultList));

          case 16:
            _context11.prev = 16;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0.message);
            res.status(400).json({
              msg: 'server error'
            });

          case 20:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 16]]);
  }));

  return function transSend(_x26, _x27) {
    return _ref11.apply(this, arguments);
  };
}();

exports.transSend = transSend;

var getUser = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var club;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _TransRoom["default"].findById(req.transRoom._id).populate('users', '_id name');

          case 3:
            club = _context12.sent;
            res.status(200).json(club.users);
            _context12.next = 11;
            break;

          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0.message);
            res.status(400).json({
              msg: 'server error'
            });

          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));

  return function getUser(_x28, _x29) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var userJoin = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var club, transUser;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _TransRoom["default"].findById(req.transRoom._id).populate('users', '_id name').populate('classmonitor', '_id name');

          case 3:
            club = _context13.sent;

            if (!(!req.params.transRoomId.match(/^[0-9a-fA-F]{24}$/) || !club)) {
              _context13.next = 6;
              break;
            }

            return _context13.abrupt("return", res.status(404).json({
              msg: 'Club not found'
            }));

          case 6:
            _context13.next = 8;
            return _TransUser["default"].findOne({
              room: req.transRoom._id,
              user: req.user._id
            });

          case 8:
            transUser = _context13.sent;

            if (transUser) {
              _context13.next = 15;
              break;
            }

            _context13.next = 12;
            return new _TransUser["default"]({
              user: req.user._id,
              room: req.transRoom._id
            });

          case 12:
            transUser = _context13.sent;
            _context13.next = 15;
            return transUser.save();

          case 15:
            if (!(club.users.filter(function (user) {
              return user._id.toString() === req.user._id.toString();
            }).length > 0)) {
              _context13.next = 17;
              break;
            }

            return _context13.abrupt("return", res.status(200).end());

          case 17:
            club.users.push(req.user._id);
            _context13.next = 20;
            return club.save();

          case 20:
            // club = await Club.findById(req.params.clubId)
            //     .populate('users', '_id name')
            //     .populate('classmonitor', '_id name');
            // club = await Club.findById(req.params.clubId)
            //     .populate('users', '_id name')
            //     .populate('classmonitor', '_id name');
            res.status(200).end();
            _context13.next = 27;
            break;

          case 23:
            _context13.prev = 23;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0.message);
            return _context13.abrupt("return", res.status(400).json({
              msg: 'server error'
            }));

          case 27:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 23]]);
  }));

  return function userJoin(_x30, _x31) {
    return _ref13.apply(this, arguments);
  };
}();

exports.userJoin = userJoin;

var deleteUser = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var userId, club, removeIndex;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            userId = req.query.userId;
            _context14.next = 4;
            return _TransRoom["default"].findOne({
              _id: req.transRoom._id
            });

          case 4:
            club = _context14.sent;

            if (!(club.users.filter(function (user) {
              return user._id.toString() === userId.toString();
            }).length === 0)) {
              _context14.next = 7;
              break;
            }

            return _context14.abrupt("return", res.status(400).json({
              msg: 'User has not yet been User'
            }));

          case 7:
            removeIndex = club.users.map(function (user) {
              return user._id.toString();
            }).indexOf(userId.toString());
            club.users.splice(removeIndex, 1);
            _context14.next = 11;
            return club.save();

          case 11:
            res.status(200).json(userId);
            _context14.next = 18;
            break;

          case 14:
            _context14.prev = 14;
            _context14.t0 = _context14["catch"](0);
            console.log(_context14.t0.message);
            return _context14.abrupt("return", res.status(400).json({
              msg: 'server error'
            }));

          case 18:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 14]]);
  }));

  return function deleteUser(_x32, _x33) {
    return _ref14.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;

var modeUpdate = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var form, room;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            // let room = await TransRoom.findById(req.transRoom._id);
            // if (!room) {
            //     res.status(400).json({
            //         msg: 'Invalid Credntials'
            //     });
            // }
            // console.log(req.body);
            // room = _.extend(room, req.body);
            // await room.save();
            // res.json(room);
            form = new _formidable["default"].IncomingForm();
            form.keepExtensions = true;
            _context16.next = 5;
            return _TransUser["default"].findOne({
              room: req.transRoom._id,
              user: req.user._id
            });

          case 5:
            room = _context16.sent;
            _context16.next = 8;
            return form.parse(req, /*#__PURE__*/function () {
              var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(err, fields, files) {
                var chat, chats;
                return _regenerator["default"].wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        if (!err) {
                          _context15.next = 3;
                          break;
                        }

                        next(err);
                        return _context15.abrupt("return");

                      case 3:
                        if (room) {
                          _context15.next = 5;
                          break;
                        }

                        return _context15.abrupt("return", res.status(400).json({
                          msg: 'Invalid Credntials'
                        }));

                      case 5:
                        room = _lodash["default"].extend(room, fields);
                        _context15.next = 8;
                        return room.save();

                      case 8:
                        _context15.next = 10;
                        return _TransChat["default"].find({
                          room: req.transRoom._id
                        }).populate('user', '_id name photo').sort({
                          date: 1
                        });

                      case 10:
                        chat = _context15.sent;
                        _context15.next = 13;
                        return (0, _trans.transPromi)(chat, room.trans);

                      case 13:
                        chats = _context15.sent;
                        res.status(200).json({
                          mode: room,
                          chat: chats
                        });

                      case 15:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15);
              }));

              return function (_x36, _x37, _x38) {
                return _ref16.apply(this, arguments);
              };
            }());

          case 8:
            _context16.next = 14;
            break;

          case 10:
            _context16.prev = 10;
            _context16.t0 = _context16["catch"](0);
            console.log(_context16.t0.message);
            return _context16.abrupt("return", res.status(400).json({
              msg: 'server error'
            }));

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 10]]);
  }));

  return function modeUpdate(_x34, _x35) {
    return _ref15.apply(this, arguments);
  };
}();

exports.modeUpdate = modeUpdate;
//# sourceMappingURL=transChat.js.map