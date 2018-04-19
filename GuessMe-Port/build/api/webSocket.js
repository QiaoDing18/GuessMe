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

// 请求建立连接
var connect = function connect(req, res) {
  var token = req.params.token;
  if (!_overAllData2.default.ROOMS[token]) {
    res.json((0, _stdRes2.default)('token无效', -1, {}));
    return;
  }

  res.cookie('token', token);
  res.json((0, _stdRes2.default)('token有效', 0, {}));
  return;
};

exports.default = connect;