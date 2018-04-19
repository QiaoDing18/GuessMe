import cookie from 'cookie';
import stdRes from './stdRes.js';
import globalData from './overAllData.js';

let createToken = () => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = '';

  let randomChar = () => {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  for(let i=0; i<4; i++){
    for(let j=0; j<4; j++){
      token += randomChar();
    }
    if(i != 3){
      token += "-";
    }
  }

  return token;
};

let create = (req, res) => {
  let token = createToken();
  globalData.TOKENS.push(token);
  res.cookie('token', token);
  res.json(stdRes('success', 0, {
    token: token
  }));

  let room = {
    id: globalData.ROOM_ID++,
    connectPool: [],
    historyData: []
  };

  globalData.ROOMS[token] = room;
  return;
};

export default create;