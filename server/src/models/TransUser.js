"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;
var TransUser = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  room: {
    type: ObjectId,
    ref: 'TransRoom'
  },
  language: {
    type: String,
    "default": 'en'
  },
  trans: {
    type: String,
    "default": 'en'
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});
var model = mongoose.model('TransUser', TransUser);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=TransUser.js.map