import cookieParser from 'cookie-parser';
import cookie from 'cookie';

let globalData = {
  ROOM_ID: 1, // 房间序号
  ROOMS: [],  // 房间信息
  TOKENS: [], // 房间token
  DATA: {}    // 题目信息
};

export default globalData;