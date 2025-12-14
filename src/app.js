const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger");

// routers
const authRouter = require("./routes/auth.route");
const usersRouter = require("./routes/users.route");
const authorRouter = require("./routes/authors.route");
const wishlistRouter = require("./routes/wishlists.route");
const bookRouter = require("./routes/books.route");
const categoryRouter = require("./routes/categories.route");
const cartRouter = require("./routes/carts.route")
const reviewRouter = require("./routes/reviews.route");

app.use(express.json());

app.use("/auth", authRouter);
app.use('/users', usersRouter);
app.use('/authors', authorRouter)
app.use('/wishlists', wishlistRouter);
app.use("/books", bookRouter)
app.use("/categories", categoryRouter);
app.use("/carts", cartRouter);
app.use("/reviews", reviewRouter)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
});

app.use("/", (req, res) => {
    res.send("서버 정상 동작중")
})

module.exports = app;