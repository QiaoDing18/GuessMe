'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalData = {
  ROOM_ID: 1, // 房间序号
  ROOMS: [], // 房间信息
  TOKENS: [], // 房间token
  DATA: {} // 题目信息
};

exports.default = globalData;