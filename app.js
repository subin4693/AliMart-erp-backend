const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");
const BranchRouter = require("./src/Routers/BranchRoutes");
const CategoryRouter = require("./src/Routers/CategoryRoutes");
const InvoiceRouter = require("./src/Routers/InvoiceRoutes");
const ProductRouter = require("./src/Routers/ProductRoutes");

const app = express();
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use("/api/v1/branch", BranchRouter);
app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/invoice", InvoiceRouter);
app.use("/api/v1/product", ProductRouter);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
