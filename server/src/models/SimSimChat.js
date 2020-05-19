"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseAutoIncrement = _interopRequireDefault(require("mongoose-auto-increment"));

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var SimSimSchema = mongoose.Schema({
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
  filterCh: {
    type: Boolean,
    "default": false
  },
  serviceCode: {
    type: String,
    "default": '0'
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});

_mongooseAutoIncrement["default"].initialize(mongoose.connection);

SimSimSchema.plugin(_mongooseAutoIncrement["default"].plugin, {
  model: 'SimSim',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
  index: true
});
var model = mongoose.model('SimSim', SimSimSchema);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=SimSimChat.js.map