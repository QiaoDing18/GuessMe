'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _router = require('./api/router.js');

var _router2 = _interopRequireDefault(_router);

var _overAllData = require('./api/overAllData.js');

var _overAllData2 = _interopRequireDefault(_overAllData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import socket from 'socket.io';
global.IO = require('socket.io')(server);

var app = (0, _express2.default)();
var server = app.listen(8868, function () {
  console.log("Start at 8868");
});

app.use((0, _cookieParser2.default)());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', _router2.default);
global.IO.on('connnection', function (socket) {
  // 接收socket的token
  var token = _cookie2.default.parese(socket.request.headers.cookie).token;
  if (_overAllData2.default.TOKENS.indexOf(token) !== -1) {
    var room = _overAllData2.default.ROOMS[token];

    // 销毁申请的token
    _overAllData2.default.TOKENS.splice(_overAllData2.default.TOKENS.indexOf(token), 1);
    console.log('Create room success');
    room.connectPool.push(socket);
    socket.on('message', function (data) {
      console.log('token:' + token);
      room.historyData.push(data);
      console.log('data:' + data);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = room.connectPool.slice(1)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var link = _step.value;

          link.emit('message', data);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  } else {
    var _token = cook.parese(socket.request.headers.cookie).token;
    var _room = _overAllData2.default.ROOMS[_token];

    // 用户连接
    console.log('Add connnect pool:' + _token);
    _room.connectPool.push(socket);
    // 发送历史数据
    if (_room.historyData.length !== 0) {
      _room.historyData.forEach(function (data) {
        socket.emit('message', data);
      });
    }

    socket.on('checkmsg', function (data) {
      var tokenData = data.token.split('=')[1];
      var connnectHost = _overAllData2.default.ROOMS[tokenData].connectPool[0];

      connnectHost.emit('checkmsg', data.msg);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _overAllData2.default.ROOMS[tokenData].connectPool.slice(1)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var link = _step2.value;

          link.emit('checkmsg', data.msg);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
  }
});