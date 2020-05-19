"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transPromi = exports.trans = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _translate = _interopRequireDefault(require("translate"));

var trans = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(text, _trans) {
    var pattern_eng, result, transText, _transText;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pattern_eng = /[a-zA-Z]/;

            if (!pattern_eng.test(text)) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return (0, _translate["default"])(text, {
              from: 'en',
              to: _trans,
              engine: 'google',
              key: 'AIzaSyA3_mho1bAmJF3I1rLiOPE8MoKOiwv_jhA'
            });

          case 4:
            transText = _context.sent;
            if (transText !== text) result = text + '>>' + transText;else result = transText;
            _context.next = 12;
            break;

          case 8:
            _context.next = 10;
            return (0, _translate["default"])(text, {
              from: 'ko',
              to: _trans,
              engine: 'google',
              key: 'AIzaSyA3_mho1bAmJF3I1rLiOPE8MoKOiwv_jhA'
            });

          case 10:
            _transText = _context.sent;
            if (_transText !== text) result = text + '>>' + _transText;else result = _transText;

          case 12:
            return _context.abrupt("return", result);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function trans(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.trans = trans;

var transPromi = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(chat, trans) {
    var pattern_eng, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pattern_eng = /[a-zA-Z]/;
            _context3.next = 3;
            return Promise.all(chat.map( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(item) {
                var transText, _transText2;

                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!pattern_eng.test(item.text)) {
                          _context2.next = 8;
                          break;
                        }

                        _context2.next = 3;
                        return (0, _translate["default"])(item.text, {
                          from: 'en',
                          to: trans,
                          engine: 'google',
                          key: 'AIzaSyA3_mho1bAmJF3I1rLiOPE8MoKOiwv_jhA'
                        });

                      case 3:
                        transText = _context2.sent;
                        if (transText !== item.text) item.text = item.text + '>>' + transText;
                        return _context2.abrupt("return", item);

                      case 8:
                        _context2.next = 10;
                        return (0, _translate["default"])(item.text, {
                          from: 'ko',
                          to: trans,
                          engine: 'google',
                          key: 'AIzaSyA3_mho1bAmJF3I1rLiOPE8MoKOiwv_jhA'
                        });

                      case 10:
                        _transText2 = _context2.sent;
                        if (_transText2 !== item.text) item.text = item.text + '>>' + _transText2;
                        return _context2.abrupt("return", item);

                      case 13:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function transPromi(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.transPromi = transPromi;
//# sourceMappingURL=trans.js.map