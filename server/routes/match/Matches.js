const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();
const Match = require("../../models/Match.js");
const MatchParticipants = require("../../models/MatchParticipants.js");
const NOW = new Date();
const  {validateJWT} = require('../../middlewares/auth.js');


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
	res.json(listofMatches)
	}
);

router.get("/usermatches", validateJWT, async function (req, res, next) {
    const id = req.user.id
    const userMatches = await Match.findAll({
        where: {
            userId: id,
            matchDate: {
                [Op.and]: {
                    [Op.gte]: NOW
                }
            }
        },
        order: [
            ['matchDate', 'ASC']
        ]
    })
    res.json(userMatches)
});

router.get('/createMatch', validateJWT, async function (req,res,next) {
    const id = req.user.id;
    res.json(id);
});

router.post('/createMatch', async function (req,res) {
                const matchData = req.body;
                await Match.create(matchData);
                res.status(201).send(matchData);
});

router.post("/", async (req, res) => {
    const match = req.body;
    await Match.create(match);
    res.json(match);
});

module.exports = router