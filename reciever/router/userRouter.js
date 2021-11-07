const express = require('express')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')

const User = require('./../modle/usermodel')
const isAuth = require('./../authentication')

var userRouter = express.Router()
userRouter.use(bodyParser.json())

//get all users
userRouter.get("/all", isAuth, (req,res) => {
  //console.log('hello')
  User.find({}).then((contact) => {
    console.log(contact)
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json(contact)
    res.send(contact)
  },(error)=>{res.json({err:error})})
})

//login user
userRouter.post("/user/login", async (req, res) => {
  //console.log('hello login')
  const  emailUser  = req.body.emailUser
  const  passwordUser = req.body.passwordUser
  Users.findOne({emailUser}).then((user)=>{
    console.log(user)
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    } else {
        if (passwordUser !== user.passwordUser) {
            return res.json({ message: "Password Incorrect" });
    }
  }
    const payload = {
        emailUser: user.emailUser,
        nameUser: user.nameUser,
        passwordUser: user.passwordUser
    }
    jwt.sign(payload, "secret", (err, token) => {
        if (err) console.log(err);
        else return res.json({ token: token });
    })
  })
})



module.exports = userRouter
