const DrugRouter = require("./controllers/drug");
const DistributionRouter = require("./controllers/distribution");
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

logger.info("Connecting to", config.DATABASE_URL);

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/drugs", DrugRouter);
app.use("/api/distributions", DistributionRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
