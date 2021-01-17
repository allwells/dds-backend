const DistributionRouter = require("express").Router();
const Distribution = require("../models/distribution");

DistributionRouter.get("/", async (request, response) => {
  const distributions = await Distribution.find({});

  response.json(distributions);
});

DistributionRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;

  Distribution.findById(id)
    .then((distributions) => {
      if (distributions) {
        response.json(distributions);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

DistributionRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;

  Distribution.findByIdAndDelete(id)
    .then((distributions) => {
      response.json(distributions);
    })
    .catch((error) => next(error));
});

DistributionRouter.put("/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const DistributionModel = {
    serial: body.serial,
    source: body.source,
    destination: body.destination,
    movement_date: body.movement_date,
    arrival_date: body.arrival_date,
    custodian: body.custodian,
  };

  Distribution.findByIdAndUpdate(id, DistributionModel, { new: true })
    .then((distributions) => {
      response.json(distributions.toJSON());
    })
    .catch((error) => next(error));
});

DistributionRouter.post("/", (request, response, next) => {
  const body = request.body;

  if (body.serial == undefined || body.custodian == undefined) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  const distribution = new Distribution({
    serial_number: body.serial,
    source: body.source,
    destination: body.destination,
    movement_date: body.movement_date,
    arrival_date: body.arrival_date,
    custodian: body.custodian,
  });

  distribution
    .save()
    .then((saved) => saved.toJSON())
    .then((result) => response.status(201).json(result))
    .catch((error) => next(error));
});

module.exports = DistributionRouter;
