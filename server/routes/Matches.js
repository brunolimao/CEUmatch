const express = require('express');
const router = express.Router();
const Match = require("../models/Match.js");


router.get("/", async (req, res) => {
    const listofMatches = await Match.findAll();
    res.json(listofMatches)
});

router.post("/", async (req, res) => {
    const match = req.body;
    await Match.create(match);
    res.json(match);
});

module.exports = router