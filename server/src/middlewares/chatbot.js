"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterKrFinlter = void 0;

var _grpcSimpleWrapper = _interopRequireDefault(require("grpc-simple-wrapper"));

// const chatbot_kr_filter = grpc_wrapper.client.createClient('155.230.27.179', 50069);
var chatbot_kr_filter = _grpcSimpleWrapper["default"].client.createClient('155.230.24.108', 50069);

var filterKrFinlter = function filterKrFinlter(request) {
  return new Promise(function (resolve, reject) {
    chatbot_kr_filter.send(request, function (err, res) {
      if (err) {
        console.log('err:', err);
        reject(err);
      } else {
        console.log('result:', res);
        resolve(res.output);
      }
    });
  });
};

exports.filterKrFinlter = filterKrFinlter;
//# sourceMappingURL=chatbot.js.map