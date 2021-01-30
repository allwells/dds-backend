const DrugRouter = require("./controllers/drug");
const DistributionRouter = require("./controllers/distribution");
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const UserRouter = require("./controllers/user");
const mongoose = require("mongoose");

// logger.info("Connecting to", config.DATABASE_URL);
logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.use("/api/drug", DrugRouter);
app.use("/api/distribution", DistributionRouter);
app.use("/api/user", UserRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
