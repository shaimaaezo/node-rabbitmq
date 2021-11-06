const bodyParser = require('body-parser')
const express = require('express')
const http = require('http');
const jwt = require("jsonwebtoken");
const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose')

const config = require('./config')
const User = require('./modle/usermodel')
const userRout = require('./router/userRouter')

const app = express();
app.use(bodyParser.json());
require("dotenv").config();

let port = process.env.PORT || 5000
let host = process.env.HOST

//config mongodb
 mongoose.connect(config.mongoURL,{useNewUrlParser: true},{ useUnifiedTopology: true }).then(()=>{
  console.log('connected to db')
},(err) => {console.log(err)}
)

// Create Connection of Amqp
amqp.connect('amqp://localhost:5672', (err, connection) => {
  if (err) {
      console.log('connection err is : ' +err)
  }
  connection.createChannel((err, channel) => {
    if (err) {
        console.log('channer err is : ' +err)
    }
    channel.assertQueue('SenderuserTest')
      console.log('i am heree')

    channel.consume('SenderuserTest',async(msg)=>{
      const  user  = JSON.parse(msg.content);
      //console.log(user.name)
      //console.log(msg.content.toString())
      //console.log('Reciever msg: '+msg.content.toString())
      email = user.email
      const userExists = await User.findOne({ email} )
      if (userExists) return console.log("User already exists")
      else{
        console.log("New User")
        const newUser = new User({
          name: user.name,
          password: user.password,
          email: user.email,
          phone: user.phone
        })
        newUser.save()
      }
      channel.ack(msg)
    })
  })
})

app.get('/',(req,res,next)=>{
  res.send('hello from reciever')
  next();
})
app.use('/user',userRout)


const server = http.createServer(app);
server.listen(port,host, () => {
  console.log('server listen')
})
