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

router.get("/usermatches/:id", async (req, res) => {
    const id = req.params.id
    const userMatches = await Match.findAll({
        where: {
            UserId: id
        },
        order: [
            ['matchDate', 'ASC']
        ]
    })
    res.json(userMatches)
})

router.post("/", async (req, res) => {
    const match = req.body;
    await Match.create(match);
    res.json(match);
});

module.exports = router