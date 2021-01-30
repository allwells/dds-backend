const DistributionRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { exists } = require("fs");

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
  const {
    serial_number,
    source,
    destination,
    batch,
    low_range,
    high_range,
    start_date,
    stop_date,
    custodian,
  } = request;

  const data = {
    serial_number,
    source,
    destination,
    batch,
    low_range,
    high_range,
    start_date,
    stop_date,
    custodian,
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
  const {
    serial_number,
    source,
    destination,
    batch,
    low_range,
    high_range,
    start_date,
    stop_date,
    custodian,
  } = request.body;

  if (serial_number == undefined || custodian == undefined) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  const distribution = {
    serial_number,
    source,
    destination,
    batch: Number(batch),
    low_range: Number(low_range),
    high_range: Number(high_range),
    start_date: new Date(start_date),
    stop_date: new Date(stop_date),
    custodian,
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
