'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var stdRes = function stdRes() {
  var errMsg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ok';
  var errCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var errObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  errObj.errMsg = errMsg;
  errObj.errCode = errCode;
  return errObj;
};

exports.default = stdRes;