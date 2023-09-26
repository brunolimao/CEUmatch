const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

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
