const express = require('express');
const { Op } = require("sequelize");
const bcrypt = require('bcript');
const router = express.Router();
const User = require("../../models/User.js");
const { loginMiddleware , jwtMiddleware } = require('../middlewares/auth.js');

router.post('/cadastro',
            jwtMiddleware, 
            async function(req,res,next) {
                const userData = req.body;
                const saltRounds = 10;
                usertData.password = await bcrypt.hash(userData.password, saltRounds);
                await User.create(userData);
            });

router.post('/login', loginMiddleware);

module.exports = router;