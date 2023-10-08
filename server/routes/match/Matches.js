const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();
const Match = require("../../models/Match.js");
const MatchParticipants = require("../../models/MatchParticipants.js");
const User = require( "../../models/User.js");
const NOW = new Date();
const  {validateJWT} = require('../../middlewares/auth.js');
const UserSolicitations = require('../../models/UserSolicitations.js');


router.get("/", validateJWT,
  async (req, res, next) => {
		const listofMatches = await Match.findAll({
			where: {
				"matchDate": {
					[Op.and]: {
						[Op.gte]: NOW
					}
				}
			},
			order: [
				['matchDate', 'ASC']
			]   
		});
        for(let i = 0; i < listofMatches.length; i++){  
            let MatchId = listofMatches[i].dataValues.id         
            const listofParticipantsId = await MatchParticipants.findAll({
                where: {
                   "MatchId": MatchId
                }
            });
            let listofParticipants = []
            for(let j=0; j < listofParticipantsId.length; j++){
                const Participant = await User.findAll({
                    where: {
                       "id": listofParticipantsId[j].dataValues.UserId
                    }
                });
                listofParticipants.push(Participant[0].dataValues.name)
            }
            listofMatches[i].dataValues.participants = listofParticipants
        }
	res.json(listofMatches)
	}
);

router.get("/usermatches", validateJWT, async function (req, res, next) {
    const id = req.user.id
    const userMatches = await Match.findAll({
        where: {
            userId: id,
        },
        order: [
            ['matchDate', 'ASC']
        ]
    });
    for(let i = 0; i < userMatches.length; i++){  
        let MatchId = userMatches[i].dataValues.id         
        const listofParticipantsId = await MatchParticipants.findAll({
            where: {
               "MatchId": MatchId
            }
        });
        let listofParticipants = []
        for(let j=0; j < listofParticipantsId.length; j++){
            const Participant = await User.findAll({
                where: {
                   "id": listofParticipantsId[j].dataValues.UserId
                }
            });
            listofParticipants.push(Participant[0].dataValues.name)
        }
        userMatches[i].dataValues.participants = listofParticipants
        const listofSolicitationsId = await UserSolicitations.findAll({
            where: {
               "MatchId": MatchId
            }
        });
        let listofSolicitations = []
        let listofIds = []
        for(let j=0; j < listofSolicitationsId.length; j++){
            const userRequest = await User.findAll({
                where: {
                   "id": listofSolicitationsId[j].dataValues.UserId
                }
            });
            listofSolicitations.push(userRequest[0].dataValues.name)
            listofIds.push(userRequest[0].dataValues.id)
        }
        userMatches[i].dataValues.solicitations = listofSolicitations
        userMatches[i].dataValues.solicitationsId = listofIds
    }
    res.json(userMatches)
});

router.get('/solicitations',
  validateJWT,
  async function(req , res , next){
   const id = req.user.id
    const userMatches = await Match.findAll({
        where: {
            userId: id,
        },
        order: [
            ['matchDate', 'ASC']
        ]
    });
    for(let i = 0; i < userMatches.length; i++){  
        let MatchId = userMatches[i].dataValues.id         
        const listofSolicitationsId = await UserSolicitations.findAll({
            where: {
               "MatchId": MatchId
            }
        });
        let listofSolicitations = []
        let listofIds = []
        for(let j=0; j < listofSolicitationsId.length; j++){
            const userRequest = await User.findAll({
                where: {
                   "id": listofSolicitationsId[j].dataValues.UserId
                }
            });
            listofSolicitations.push(userRequest[0].dataValues.name)
            listofIds.push(userRequest[0].dataValues.id)
        }
        userMatches[i].dataValues.solicitations = listofSolicitations
        userMatches[i].dataValues.solicitationsId = listofIds
    }
    res.json(userMatches)
  }
)

router.get('/requests/:id' , async function(req,res) {
    const id = req.params.id
    const userSolicitations = await UserSolicitations.findAll({
        where: {
            MatchId: id
        },
        attributes:['UserId']
    })
    res.json(userSolicitations)
});

router.get('/createMatch', validateJWT, async function (req,res,next) {
    const id = req.user.id;
    res.json(id);
});

router.post('/createMatch', async function (req,res) {
                const matchData = req.body;

                const matchCreated = await Match.create(matchData);
                await MatchParticipants.create({UserId: matchData.userId, MatchId: matchCreated.dataValues.id})
                res.status(201).send(matchData);
});

router.get('/updateMatch/:id', validateJWT, async function (req,res,next) {
    const id = req.params.id
    const eMatch = await Match.findByPk(id);
    res.json(eMatch);
});

router.post('/updateMatch/:id', async function (req,res) {
    const id = req.params.id
    const { title, matchDate, matchCourt, matchSport } = req.body;
    await Match.update({ title: title, matchDate: matchDate, matchCourt: matchCourt, matchSport: matchSport }, { where: { id: id } });
    res.status(201).send(id);
});

router.delete('/deleteMatch/:id', validateJWT, async function (req, res) {
    const id = req.params.id;
    await Match.destroy({
        where: {
            id: id,
        },
    });
    res.json("DELETADA")
})

router.post("/", async (req, res) => {
    const match = req.body;
    await Match.create(match);
    res.json(match);
});

router.get('/:id', validateJWT, async function (req, res) {
    const id = req.params.id;
    const listofUsers =  await MatchParticipants.findAll({
        where: {
            MatchId: id,
        },
    });
    res.json(listofUsers)
})

module.exports = router