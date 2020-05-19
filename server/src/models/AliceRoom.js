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
var AliceRoom = new Schema({
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
  mode: {
    type: String,
    "default": 'max'
  },
  language: {
    type: String,
    "default": 'en'
  },
  botmode: {
    type: String,
    "default": 'scenario'
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

AliceRoom.plugin(_mongooseAutoIncrement["default"].plugin, {
  model: 'AliceRoom',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
  index: true
});
var model = mongoose.model('AliceRoom', AliceRoom);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=AliceRoom.js.map