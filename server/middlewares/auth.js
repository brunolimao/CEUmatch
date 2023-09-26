require("dotenv").config()
const express = require("express")
const app = express()
app.use (express.json())
const jwt = require("jsonwebtoken")

const bcrypt = require('bcrypt');
const User = require('../models/User');

const hashAcessSecretKey = '67c0fbaeee22ae50902039bd1523c094dc27b4bce6ef664a939ac3bb2dbc780d'


async function loginAlt(req,res,next){
  const emailUser = req.body.email;
  const passwordUser = req.body.password;
  const user = await User.findOne({
    where: {email:emailUser}
  });
  if (!user) {
    throw new Error('E-mail incorreto!');
  }

  const validPassword = await bcrypt.compare(passwordUser, user.password);
  if (!validPassword) {
      throw new Error('E-mail e/ou senha incorretos!');
  }
  let payload = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  const token = jwt.sign(payload, hashAcessSecretKey, {
    //expiresIn: 60 // 1 minuto de expiração
  });

  res.cookie("token" , token);
  
  res.json({ auth: true, token: token });
}

function validateJWT(req,res,next){
    const token = req.cookies.token;
    try {
      const user = jwt.verify(token, hashAcessSecretKey);
      req.user = user;
      next();
    } catch (err) {
      res.clearCookie("token");
      res.send('Você precisa estar logado para acessar essa rota.');
    }
}

module.exports = {
  loginAlt,
  validateJWT
};