const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/User.js");
const { loginAlt, validateJWT } = require('../middlewares/auth.js');
const app = express();
app.use(express.json());

router.post('/cadastro',
            async function(req,res,next) {
                const userData = req.body;  // name , email , password
                const saltRounds = 10;
                userData.password = await bcrypt.hash(userData.password, saltRounds);
                await User.create(userData);
                res.status(201).json(userData);
            });

router.post('/login',loginAlt);

router.get('/welcome' , 
            validateJWT,
            async function(req , res , next){
                const name = req.user.name;
                res.status(200).send('Bem vindo, ' + name );
            });

router.delete('/logout', function(req,res,nex){
    res.clearCookie("token");
    res.send('Deslogado com sucesso.');
});


module.exports = router;