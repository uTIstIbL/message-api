const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = 3000;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length
const mongoose = require("mongoose");
const { config } = require('dotenv')

// import package.json
const pkg = require('./package.json')

// import api
const apiMessage = require('./routes/message');

if(!cluster.isMaster){
    console.log("最大流量啟動")

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', () => {
        console.log(`工作流量 過載. 分給一個新的伺服器...`);
        cluster.fork();
    });
} else {
async function run() {
    try {
      await mongoose.connect("mongodb+srv://messengerAdmin:messengerAdmin@message-api.qx3ni.mongodb.net/?retryWrites=true&w=majority&appName=message-api");
      console.log("資料庫連線成功");
    } catch (error) {
      
      console.error(error, "資料庫連線失敗")
    }
  }
  run()
  
  
  // 中介軟體使用
  app.use(morgan('Aaron'))
  app.use(morgan(':method :url :response-time'));
  
  // 引入api
  config();
  app.use('/message', apiMessage)
  
  app.get('/', (req,res) => {
      return res.status(200).json({
          "name":pkg.name,
          "version":pkg.version
      })
  })
  
  
  app.listen(PORT, () => {
      console.log(`伺服器已啟動在 http://localhost:${PORT}`);
      
  })
}  

