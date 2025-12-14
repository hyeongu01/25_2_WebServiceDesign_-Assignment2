const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger");

// routers
const authRouter = require("./routes/auth.route");
const usersRouter = require("./routes/users.route");
const authorRouter = require("./routes/authors.route");
const wishlistRouter = require("./routes/wishlists.route");

app.use(express.json());

app.use("/auth", authRouter);
app.use('/users', usersRouter);
app.use('/authors', authorRouter)
app.use('/wishlists', wishlistRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


module.exports = app;