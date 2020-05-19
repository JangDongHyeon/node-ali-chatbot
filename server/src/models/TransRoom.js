"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseAutoIncrement = _interopRequireDefault(require("mongoose-auto-increment"));

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;
var TransRoom = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    data: Buffer,
    contenType: String
  },
  language: {
    type: String,
    "default": 'en'
  },
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  classmonitor: {
    type: ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});

_mongooseAutoIncrement["default"].initialize(mongoose.connection);

TransRoom.plugin(_mongooseAutoIncrement["default"].plugin, {
  model: 'TransRoom',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
  index: true
});
var model = mongoose.model('TransRoom', TransRoom);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=TransRoom.js.map