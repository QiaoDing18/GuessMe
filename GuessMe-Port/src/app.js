import express from 'express';
import socket from 'socket.io';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import router from './api/router.js';
import globalData from './api/overAllData.js'

const app = express();
const server = app.listen(8868, () => {
  console.log("Start at 8868");
});

global.IO = require('socket.io')(server);

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
  console.log(socket);
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
    let token = cook .parese(socket.request.headers.cookie).token;
    let room = globalData.ROOMS[token];

    // 用户连接
    console.log('Add connnect pool:' + token);
    room.connectPool.push(socket);
    // 发送历史数据
    if(room.historyData.length !== 0){
      room.historyData.forEach((data) => {
        socket.emit('message', data);
      });
    }

    socket.on('checkmsg', (data) => {
      let tokenData = data.token.split('=')[1];
      let connnectHost = globalData.ROOMS[tokenData].connectPool[0];

      connnectHost.emit('checkmsg', data.msg);

      for(let link of globalData.ROOMS[tokenData].connectPool.slice(1)){
        link.emit('checkmsg', data.msg);
      }
    });
  }
});