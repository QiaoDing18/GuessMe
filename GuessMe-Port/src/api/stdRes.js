let stdRes = (errMsg = 'ok', errCode = 0, errObj = {}) => {
  errObj.errMsg = errMsg;
  errObj.errCode = errCode;
  return errObj;
};

export default stdRes;