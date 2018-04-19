'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.checkData = exports.getData = exports.setData = undefined;

var _data = require('../../data.json');

var _data2 = _interopRequireDefault(_data);

var _stdRes = require('./stdRes.js');

var _stdRes2 = _interopRequireDefault(_stdRes);

var _overAllData = require('./overAllData.js');

var _overAllData2 = _interopRequireDefault(_overAllData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setData = function setData(req, res) {
	var id = req.params.id;
	var len = _data2.default.datas.length - 1;
	var num = parseInt(Math.random() * (len + 1));

	_overAllData2.default.DATA[id] = _data2.default.datas[num];
	console.log(_overAllData2.default.DATA);

	res.json((0, _stdRes2.default)('success', 0, {
		des: _data2.default.datas[num].des,
		ans: _data2.default.datas[num].ans
	}));

	return;
};

var getData = function getData(req, res) {
	var id = req.params.id;
	var subject = _overAllData2.default.DATA[id];
	res.json((0, _stdRes2.default)('success', 0, {
		des: subject.des
	}));

	return;
};

var checkData = function checkData(req, res) {
	var id = req.params.id;
	var answer = req.params.answer;

	if (answer == _overAllData2.default.DATA[id].ans) {
		res.json((0, _stdRes2.default)('success', 0, {}));
	} else {
		res.json((0, _stdRes2.default)('error', -1, {}));
	}
};

exports.setData = setData;
exports.getData = getData;
exports.checkData = checkData;