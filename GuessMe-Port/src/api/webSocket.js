import cookie from 'cookie';
import stdRes from './stdRes.js';
import globalData from './overAllData.js';

// 请求建立连接
let connect = (req, res) => {
  let token = req.params.token;
  if(!globalData.ROOMS[token]){
    res.json(stdRes('token无效', -1, {}));
    return;
  }

  res.cookie('token', token);
  res.json(stdRes('token有效', 0, {}));
  return;
};

export default connect;