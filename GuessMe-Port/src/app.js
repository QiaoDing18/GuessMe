import express from 'express';
// import socket from 'socket.io';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import router from './router.js';
import globalData from '../overAllData.js'

global.IO = require('socket.io')(server);

let app = express();
let server = app.listen(8868, () => {
  console.log("Start at 8868");
});

app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers','Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', router);
global.IO.on('connnection', (socket) => {
  // 接收socket的token
  let token = cookie.parese(socket.request.headers.cookie).token;
  if(globalData.TOKENS.indexOf(token) !== -1){
    let room = globalData.ROOMS[token];
    
    // 销毁申请的token
    globalData.TOKENS.splice(globalData.TOKENS.indexOf(token), 1);
    console.log('Create room success');
    room.connectPool.push(socket);
    socket.on('message', (data) => {
      console.log('token:' + token);
      room.historyData.push(data);
      console.log('data:' + data);
      for(let link of room.connectPool.slice(1)){
        link.emit('message', data);
      }
    });
  }else{
    
  }
})