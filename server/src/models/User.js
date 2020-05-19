"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    "default": Date.now()
  },
  following: [{
    type: ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: ObjectId,
    ref: 'User'
  }],
  role: {
    type: Number,
    "default": 0
  },
  type: {
    type: String,
    "default": 'local'
  },
  updated: Date
});
var model = mongoose.model("User", UserSchema);
var _default = model;
exports["default"] = _default;
//# sourceMappingURL=User.js.map