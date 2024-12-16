const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = 3000;
const db = require('./config/db')

// import package.json
const pkg = require('./package.json')

// import api
const apiMessage = require('./routes/message')

// 連接資料庫
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await db.client.connect();
      // Send a ping to confirm a successful connection
      await db.client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await db.client.close();
    }
  }
run().catch(console.dir);

// 中介軟體使用
app.use(morgan('Aaron'))
app.use(morgan(':method :url :response-time'));

// 引入api
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
