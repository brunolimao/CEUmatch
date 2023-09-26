const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
    extended: false,
  }));

app.use(cookieParser());  

// Routers
const matchRouter = require('./routes/match/Matches');
app.use("/matches", matchRouter);

const userRouter = require('./routes/Users');
app.use("/users" , userRouter);

app.listen(3001, () => {
    console.log("Server started on port 3001 : http://localhost:3001");
});
