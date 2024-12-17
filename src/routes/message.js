const express = require('express');
const router = express.Router();

// import db
const Messenger = require('../models/message')


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
                
    } catch (error) {
        return res.status(500).json({
            status: 500,
            data:{
                error: "操作失敗：伺服器錯誤"
            }
        })
    }
})

router.put('/onnlinestatus', (req,res) => {
    
})

module.exports = router