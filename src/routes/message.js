const express = require('express');
const router = express.Router();

// import db
const Messenger = require('../models/message')


router.get('/', async (req,res) => {
})

router.post('/', async (req,res) => {
    const sendMessenger = { messenger: req.body.messenger }

    await Messenger.create({ sendMessenger })

    return res.status(200).json({
        status: 200,
        data:{
            sendMessenger
        }
    })
    
})

router.post('/onetomore', (req,res) => {

})

router.put('/onnlinestatus', (req,res) => {

})

module.exports = router