"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _socketioJwt = _interopRequireDefault(require("socketio-jwt"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

require("./db");

require("./config/passport");

var _global = _interopRequireDefault(require("./routers/global"));

var _auth = _interopRequireDefault(require("./routers/auth"));

var _user = _interopRequireDefault(require("./routers/user"));

var _dataChat = _interopRequireDefault(require("./routers/dataChat"));

var _aliceChat = _interopRequireDefault(require("./routers/aliceChat"));

var _transChat = _interopRequireDefault(require("./routers/transChat"));

var _dataCol = _interopRequireDefault(require("./routers/dataCol"));

_dotenv["default"].config();

var app = (0, _express["default"])();

var server = _http["default"].Server(app);

var io = new _socket["default"](server);
app.use((0, _helmet["default"])());
app.use((0, _cookieParser["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use((0, _expressValidator["default"])());
app.use(_passport["default"].initialize());

require('./config/passport')(_passport["default"]);

require('./socket/groupChat')(io);

require('./socket/groupRoom')(io);

app.use('/api/global', _global["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/user', _user["default"]);
app.use('/api/data_chat', _dataChat["default"]);
app.use('/api/alice', _aliceChat["default"]);
app.use('/api/trans', _transChat["default"]);
app.use('/api/dataCol', _dataCol["default"]);
var PORT = process.env.PORT || 8899;

var handleListening = function handleListening() {
  return console.log("\u2705  Listening on: http://localhost:".concat(PORT));
};

server.listen(PORT, handleListening);
//# sourceMappingURL=app.js.map