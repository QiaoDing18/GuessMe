'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _token = require('./token.js');

var _token2 = _interopRequireDefault(_token);

var _subject = require('./subject.js');

var _webSocket = require('./webSocket.js');

var _webSocket2 = _interopRequireDefault(_webSocket);

var _getRooms = require('./getRooms.js');

var _getRooms2 = _interopRequireDefault(_getRooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// 自定义token
router.get('/token/create', _token2.default);

// 请求建立socket连接
router.get('/webSocket/connect/:token', _webSocket2.default);

// 获取房间列表
router.get('/webSocket/getRooms', _getRooms2.default);

// 设置答案，提示词
router.get('/subject/set/:id', _subject.setData);

// 玩家获取提示词
router.get('/subject/get/:id', _subject.getData);

// 检查答案
router.get('/subject/check/:answer/:id', _subject.checkData);

exports.default = router;