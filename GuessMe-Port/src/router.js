import express from 'express';
import create from './api/token.js';
import connect from './api/webSocket.js';
import getRooms from './api/getRooms.js';

let router = express.Router();

// 自定义token
router.get('/token/create', create);

// 请求建立socket连接
router.get('/webSocket/connect/:token', connect);

// 获取房间列表
router.get('/webSocket/getRooms', getRooms);

// 设置答案，提示词
router.get('/subject/set/:id', setData);

// 玩家获取提示词
router.get('/subject/get/:id', getData);

// 检查答案
router.get('/subject/check/:answer/:id', checkData);

export default router;