const express = require('express');
const router = express.Router();

// import db
const Messenger = require('../models/message')
const Status = require('../models/status');


router.get('/', async (req,res) => {
    try {
        const messageFind = await Messenger.find({})
    
        return res.status(200).json({
            status:200,
            data:{
                messageFind
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            data:{
                error: "操作失敗：伺服器錯誤"
            }
        })
    }
})

router.post('/', async (req,res) => {
    try {
        const sendMessenger = { 
            messenger: req.body.messenger 
        }
    
        const Message = await Messenger.create({ message: req.body.messenger })

        return res.status(200).json({
            status: 200,
            data:{
                Message: Message
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            data:{
                error: "操作失敗：伺服器錯誤"
            }
        })
    }
    
})

router.post('/onetomore', (req,res) => {
    try {
    // 一對多群組聊天室 
                
    } catch (error) {
        return res.status(500).json({
            status: 500,
            data:{
                error: "操作失敗：伺服器錯誤"
            }
        })
    }
})

// 調整為上線狀態
router.post('/onlinestatus', async (req, res) => {
    try {
      const onlinestatus = {status: req.body.status}
      
      //  判斷是否轉為線下狀態
      if(onlinestatus.status === -1){
        return res.status(401).json({
            status: 401,
            data: {
              error: "操作失敗：您現在是線下狀態"
            }
        })
      }   
      
      // 判斷是否為上限狀態   
      if(onlinestatus.status === 1){
        //  將上線狀態與資料庫做連接
        const onlineStatusConn = await Status.create({ status: req.body.status })

        return res.status(200).json({
            status: 200,
            data: {
              status: onlineStatusConn
            }
        })
      }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            data:{
                error: "操作失敗：伺服器錯誤"
            }
        })       
    }
})

// 更新為線下狀態
router.put('/onlinestatus/:id', async (req,res) => {
    try {
      const findStatus = await Status.findOne({ _id: undefined });

      // 判斷是否為線下狀態
      if( !findStatus || findStatus !== -1 ){
        const updateStatus = { status: req.body.status }

        const statusUpdate = await Status.updateOne(
            { status: req.body.status }
        )
    
        return res.status(200).json({
            status: 200,
            data: {
                updateStatus             
            }
        })
      }else if(findStatus !== 1){
        //  從線下狀態再一次調整為上線狀態
        const updateOnlineStatue = await Status.updateOne({ status: req.body.status }) 
              

        return res.status(200).json({
            status: 200,
            data:{
                status: updateOnlineStatue
            }
        })
      }else{
        return res.status(401).json({
            status: 401,
            data:{
                error: "操作失敗: 伺服器驗證失敗"
            }
        })
      }      
    } catch (error) {
        return res.status(500).json({
            status: 500,
            data:{
                error: "操作失敗：伺服器錯誤"
            }
        })       
    }
})

module.exports = router