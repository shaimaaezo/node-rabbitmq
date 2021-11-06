const bodyParser = require('body-parser')
const express = require('express')
const http = require('http');
const jwt = require("jsonwebtoken");
const amqp = require('amqplib/callback_api');

const app = express();
app.use(bodyParser.json());
require("dotenv").config();

let port = process.env.PORT || 3000
let host = process.env.HOST
var channel

// Create Connection of Amqp
amqp.connect('amqp://localhost:5672', async(err, connection) => {
  if (err) {
      console.log('connection err is : ' +err)
  }
  channel = await connection.createChannel((err, channel) => {
    if (err) {
        console.log('channer err is : ' +err)
    }
    channel.assertQueue('SenderuserTest');
    console.log('i am heree')
  })
})

app.get('/',(req,res,next) => {
  res.send('hello from sender')
})
//post api
app.post("/user/signup", async (req, res) => {
    const  user  = req.body;
    //const products = await Product.find({ _id: { $in: ids } });
    channel.sendToQueue(
        "SenderuserTest",
        Buffer.from(JSON.stringify(user))
    )
    console.log(user)
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json({
      Message: "Post successfully",
      data:user})
})


const server = http.createServer(app);
server.listen(port,host, () => {
  console.log('server listen')
})
