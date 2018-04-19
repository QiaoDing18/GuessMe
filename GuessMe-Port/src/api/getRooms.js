import stdRes from './stdRes.js';
import globalData from './overAllData.js';

let getRooms = (req, res) => {
  let result = {rooms: []};
  let roomId = 1;

  for(let token in globalData.ROOMS){
    result.rooms.push({
      id: roomId++,
      token: token
    });
  };

  res.json(stdRes('ok', 0, result));
  return;
};

export default getRooms;