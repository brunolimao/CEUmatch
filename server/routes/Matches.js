const express = require('express');
const router = express.Router();
const { Matches } = require("../models");


router.get("/", async (req, res) => {
    const listofMatches = await Matches.findAll();
    res.json(listofMatches)
});

router.post("/", async (req, res) => {
    const match = req.body;
    await Matches.create(match);
    res.json(match);
});

module.exports = router