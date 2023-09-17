const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

// Routers
const matchRouter = require('./routes/match/Matches');
app.use("/matches", matchRouter);


app.listen(3001, () => {
    console.log("Server started on port 3001");
});
