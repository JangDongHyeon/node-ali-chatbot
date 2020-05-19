"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var DataColRoomSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});
var model = mongoose.model('DataColRoom', DataColRoomSchema);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=DataColRoom.js.map