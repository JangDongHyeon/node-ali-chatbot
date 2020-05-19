"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var DataColChatSchema = mongoose.Schema({
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
    ref: 'SimSimRoom'
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
var model = mongoose.model('DataColChat', DataColChatSchema);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=DataColChat.js.map