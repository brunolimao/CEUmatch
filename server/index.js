const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

// Routers
const postRouter = require('./routes/Matches');
app.use("/matches", postRouter);


app.listen(3001, () => {
    console.log("Server started on port 3001");
});
