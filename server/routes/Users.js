const express = require('express');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.js");
const { loginMiddleware , jwtMiddleware } = require('../middlewares/auth.js');
const app = express();
app.use(express.json());

router.post('/cadastro',
            //jwtMiddleware, 
            async function(req,res,next) {
                const userData = req.body;  // name , email , password
                const saltRounds = 10;
                userData.password = await bcrypt.hash(userData.password, saltRounds);
                await User.create(userData);
                res.status(201).json(userData);
               
            });

router.post('/login', loginMiddleware);

router.get('/teste' , async function(req,res,next){
                    res.send('Teste concluído.');
});

router.get('/protected' , 
            jwtMiddleware,
            async function(req , res , next){
                res.status(200).send('Voce tem acesso a uma rota protegida por login!');
            });

module.exports = router;