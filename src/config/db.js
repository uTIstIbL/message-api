const { MongoClient, ServerApiVersion } = require('mongodb');
const URI = "mongodb+srv://portfolioDB:portfolioDB@message-api.qx3ni.mongodb.net/?retryWrites=true&w=majority&appName=message-api"


const client = new MongoClient(URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

module.exports = { client }