"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseAutoIncrement = _interopRequireDefault(require("mongoose-auto-increment"));

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var SimSimRoomSchema = mongoose.Schema({
  title: {
    type: String
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});

_mongooseAutoIncrement["default"].initialize(mongoose.connection);

SimSimRoomSchema.plugin(_mongooseAutoIncrement["default"].plugin, {
  model: 'SimSimRoom',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
  index: true
});
var model = mongoose.model('SimSimRoom', SimSimRoomSchema);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=SimSimRoom.js.map