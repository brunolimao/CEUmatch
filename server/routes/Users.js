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
    const joinMatch = req.body; // MatchId, UserId, matchOwnerId
    if(!(await UserSolicitations.findOne({ where: {
                                              MatchId: joinMatch.MatchId,
                                              UserId: joinMatch.UserId,
                                              matchOwner:joinMatch.matchOwner
                                            }
                                  })
    )){
      await UserSolicitations.create(joinMatch)
    }
    res.status(200)
  }
)

router.get('/user/:id' ,
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
    await MatchParticipants.create({ UserId: userSolicitationAccept.userId, MatchId: userSolicitationAccept.matchId})
    await UserSolicitations.destroy({
      where: {
          UserId: userSolicitationAccept.userId,
          MatchId: userSolicitationAccept.matchId
      },
  })
  res.status(200);
  }
)

router.get('/solicitations/deny', validateJWT, async function (req,res,next) {
  const id = req.user.id;
  res.json(id);
});

router.post('/solicitations/deny',
async function(req , res , next){
  const userSolicitationAccept = req.body //matchId, userId (id de quem quer entrar)
  await UserSolicitations.destroy({
    where: {
        UserId: userSolicitationAccept.userId,
        MatchId: userSolicitationAccept.matchId
    },
  })
  res.status(200);
  
})

router.get('/profile/:id', validateJWT, async function (req,res,next) {
  const id = req.params.id
  const user = await User.findByPk(id);
  res.json(user);
});

router.post('/profile/:id', async function (req,res) {
  const id = req.params.id
  let { name, email, password} = req.body;
  const saltRounds = 10;
  password = await bcrypt.hash(password, saltRounds);
  await User.update({ name: name, email: email, password: password}, { where: { id: id } });
  res.status(201).send(id);
});

router.get('/nav' , 
            validateJWT,
            async function(req , res , next){
                const user = req.user;
                console.log(user)
                res.json(user);
            });

module.exports = router;