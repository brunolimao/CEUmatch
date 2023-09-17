const express = require('express');
const router = express.Router();
const Match = require("../../models/Match.js");


router.get("/", async (req, res) => {
    const listofMatches = await Match.findAll();
    res.json(listofMatches)
});

router.get("/usermatches/:id", async (req, res) => {
    const id = req.params.id
    const userMatches = await Match.findAll({
        where: {
            UserId: id
        }
    })
    res.json(userMatches)
})

router.post("/", async (req, res) => {
    const match = req.body;
    await Match.create(match);
    res.json(match);
});

module.exports = router