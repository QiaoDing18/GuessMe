'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stdRes = require('./stdRes.js');

var _stdRes2 = _interopRequireDefault(_stdRes);

var _overAllData = require('./overAllData.js');

var _overAllData2 = _interopRequireDefault(_overAllData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRooms = function getRooms(req, res) {
  var result = { rooms: [] };
  var roomId = 1;

  for (var token in _overAllData2.default.ROOMS) {
    result.rooms.push({
      id: roomId++,
      token: token
    });
  };

  res.json((0, _stdRes2.default)('ok', 0, result));
  return;
};

exports.default = getRooms;