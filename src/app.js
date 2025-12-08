const express = require("express");
const app = express();

// routers
const authRouter = require("./routes/auth.route");
const usersRouter = require("./routes/users.route");

app.use(express.json());

app.use("/auth", authRouter);
app.use('/users', usersRouter);


module.exports = app;