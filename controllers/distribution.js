const DistributionRouter = require("express").Router();
const Distribution = require("../models/distribution");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

DistributionRouter.get("/", async (request, response) => {
  const distributions = await prisma.distribution_table.findMany();

  response.json(distributions);
});

DistributionRouter.get("/:serial_number", async (request, response, next) => {
  const serial_number = request.params.serial_number;

  await prisma.distribution_table
    .findMany({ where: { serial_number: serial_number } })
    .then((distributions) => {
      if (distributions) {
        response.json(distributions);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

DistributionRouter.delete(
  "/:serial_number",
  async (request, response, next) => {
    const serial_number = request.params.serial_number;

    await prisma.distribution_table
      .deleteMany({
        where: { serial_number: serial_number },
      })
      .then((distributions) => {
        response.json(distributions);
      })
      .catch((error) => next(error));
  }
);

DistributionRouter.put("/:serial_number", async (request, response, next) => {
  const serial_number = request.params.id;
  const body = request.body;

  const data = {
    serial_number: body.serial_number,
    source: body.source,
    destination: body.destination,
    start_date: body.start_date,
    stop_date: body.stop_date,
    custodian: body.custodian,
  };

  await prisma.distribution_table
    .updateMany({
      where: { serial_number: serial_number },
      data: data,
    })
    .then((distributions) => {
      response.json(distributions.toJSON());
    })
    .catch((error) => next(error));
});

DistributionRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.serial_number == undefined || body.custodian == undefined) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  const distribution = {
    serial_number: body.serial,
    source: body.source,
    destination: body.destination,
    movement_date: body.movement_date,
    arrival_date: body.arrival_date,
    custodian: body.custodian,
  };

  await prisma.distribution_table
    .create({
      data: distribution,
    })
    .then((saved) => saved.toJSON())
    .then((result) => response.status(201).json(result))
    .catch((error) => next(error));
});

module.exports = DistributionRouter;
