"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;
var TransChat = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  room: {
    type: ObjectId,
    ref: 'TransRoom'
  },
  sentiment: {
    type: String
  },
  bot: {
    type: Boolean,
    "default": false
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});
var model = mongoose.model('TransChat', TransChat);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=TransChat.js.map