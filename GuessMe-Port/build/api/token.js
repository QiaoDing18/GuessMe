'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _stdRes = require('./stdRes.js');

var _stdRes2 = _interopRequireDefault(_stdRes);

var _overAllData = require('./overAllData.js');

var _overAllData2 = _interopRequireDefault(_overAllData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createToken = function createToken() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var token = '';

  var randomChar = function randomChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      token += randomChar();
    }
    if (i != 3) {
      token += "-";
    }
  }

  return token;
};

var create = function create(req, res) {
  var token = createToken();
  _overAllData2.default.TOKENS.push(token);
  res.cookie('token', token);
  res.json((0, _stdRes2.default)('success', 0, {
    token: token
  }));

  var room = {
    id: _overAllData2.default.ROOM_ID++,
    connectPool: [],
    historyData: []
  };

  _overAllData2.default.ROOMS[token] = room;
  return;
};

exports.default = create;