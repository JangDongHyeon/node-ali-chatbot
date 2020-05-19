"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Users = /*#__PURE__*/function () {
  function Users() {
    (0, _classCallCheck2["default"])(this, Users);
    this.users = [];
  }

  (0, _createClass2["default"])(Users, [{
    key: "AddUserData",
    value: function AddUserData(id, room) {
      var users = {
        id: id,
        room: room
      };
      this.users.push(users);
      return users;
    }
  }, {
    key: "RemoveUser",
    value: function RemoveUser(id) {
      var user = this.GetUser(id);
      var result;

      if (user) {
        result = this.users.filter(function (user) {
          return user.id === id;
        });
        this.users = this.users.filter(function (user) {
          return user.id !== id;
        });
      }

      return result[0];
    }
  }, {
    key: "GetUser",
    value: function GetUser(id) {
      var getUser = this.users.filter(function (userId) {
        return userId.id === id;
      })[0];
      return getUser;
    }
  }, {
    key: "GetUsersList",
    value: function GetUsersList(room) {
      var users = this.users.filter(function (user) {
        return user.room === room;
      });
      var namesArray = users.map(function (user) {
        return user.name;
      });
      return namesArray;
    }
  }]);
  return Users;
}();

module.exports = {
  Users: Users
};
//# sourceMappingURL=UserClass.js.map