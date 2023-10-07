const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/User.js");
const UserSolicitations = require("../models/UserSolicitations.js");
const MatchParticipants = require("../models/MatchParticipants.js");
const { loginAlt, validateJWT } = require('../middlewares/auth.js');
const app = express();
app.use(express.json());

router.post('/cadastro',
  async function(req,res,next) {
      const userData = req.body;  // name , email , password
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
      await User.create(userData);
      res.status(201).send(userData);
  });

router.post('/login',loginAlt,
    async function(req , res , next){
        res.redirect("/welcome")
});



router.get('/welcome' , 
    validateJWT,
    async function(req , res , next){
        const name = req.user.id;
        res.status(200).json({name});
    });

router.get('/logout', function(req,res,nex){
    res.sessionStorage.clear()
    res.clearCookie("token");
    res.send('Deslogado com sucesso.');
});

router.get('/join', validateJWT, async function (req,res,next) {
  const id = req.user.id;
  res.json(id);
});

router.post('/join', //validateJWT,
  async function(req , res , next){
    const joinMatch = req.body; // matchId, userId, matchOwnerId
    await UserSolicitations.create(joinMatch)
    res.status(200)
  }
)


router.get('/solicitations',
  validateJWT,
  async function(req , res , next){
    const id = req.user.id;
    const userSolicitations = await UserSolicitations.findAll({
      where: {
          matchOwner: id,
      }
    })
  res.status(200).json({userSolicitations});
  }
)

router.get('/:id' ,
  validateJWT,
  async function(req,res,next){
    const id = req.params.id;
    const user = await User.findByPk(id);
    const nameUser = user.name;
    return nameUser;
  })

router.get('/solicitations/accept', validateJWT, async function (req,res,next) {
  const id = req.user.id;
  res.json(id);
});

router.post('/solicitations/accept',
  async function(req , res , next){
    const userSolicitationAccept = req.body //matchId, userId (id de quem quer entrar)
    await MatchParticipants.create(userSolicitationAccept)
    await userSolicitations.destroy({
      where: {
          UserId: userId,
          MatchId: matchId
      },
  })
  res.status(200).json({userSolicitations});
  }
)

router.get('/solicitations/deny', validateJWT, async function (req,res,next) {
  const id = req.user.id;
  res.json(id);
});

router.post('/solicitations/deny',
  async function(req , res , next){
    const userSolicitationAccept = req.body //matchId, userId (id de quem quer entrar)
    await userSolicitations.destroy({
      where: {
          UserId: userId,
          MatchId: matchId
      },
  })
  res.status(200).json({userSolicitations});
  }
)



module.exports = router;