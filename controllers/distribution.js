const DistributionRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const Distribution = require("../models/distribution");

DistributionRouter.get("/", async (req, res) => {
  const dist = await Distribution.find({});
  res.json(dist);
});

DistributionRouter.get("/:serial_number", async (req, res, next) => {
  const serial = req.params.serial_number;

  await Distribution.find({ serial_number: serial })
    .then((dists) => {
      if (dists) {
        res.json(dists);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

DistributionRouter.post("/", async (req, res, next) => {
  const body = req.body;

  if (
    body.serial_number == undefined ||
    body.source == undefined ||
    body.destination == undefined ||
    body.batch == undefined ||
    body.low_range == undefined ||
    body.high_range == undefined ||
    body.start_date == undefined ||
    body.stop_date == undefined ||
    body.custodian == undefined
  ) {
    return res.status(400).json({ error: "Content missing" });
  }

  const distribution = new Distribution({
    serial_number: body.serial_number,
    source: body.source,
    destination: body.destination,
    batch: body.batch,
    low_range: body.low_range,
    high_range: body.high_range,
    start_date: body.start_date,
    stop_date: body.stop_date,
    custodian: body.custodian,
  });

  await distribution
    .save()
    .then((saved) => saved.toJSON())
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

module.exports = DistributionRouter;

// const prisma = new PrismaClient();

// DistributionRouter.get("/", async (request, response) => {
//   const distributions = await prisma.distribution_table.findMany();

//   response.json(distributions);
// });

// DistributionRouter.get("/:serial_number", async (request, response, next) => {
//   const serial_number = request.params.serial_number;

//   await prisma.distribution_table
//     .findMany({ where: { serial_number: serial_number } })
//     .then((distributions) => {
//       if (distributions) {
//         response.json(distributions);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

// DistributionRouter.delete(
//   "/:serial_number",
//   async (request, response, next) => {
//     const serial_number = request.params.serial_number;

//     await prisma.distribution_table
//       .deleteMany({
//         where: { serial_number: serial_number },
//       })
//       .then((distributions) => {
//         response.json(distributions);
//       })
//       .catch((error) => next(error));
//   }
// );

// DistributionRouter.put("/:serial_number", async (request, response, next) => {
//   const {
//     serial_number,
//     source,
//     destination,
//     batch,
//     low_range,
//     high_range,
//     start_date,
//     stop_date,
//     custodian,
//   } = request;

//   const data = {
//     serial_number,
//     source,
//     destination,
//     batch,
//     low_range,
//     high_range,
//     start_date,
//     stop_date,
//     custodian,
//   };

//   await prisma.distribution_table
//     .updateMany({
//       where: { serial_number: serial_number },
//       data: data,
//     })
//     .then((distributions) => {
//       response.json(distributions.toJSON());
//     })
//     .catch((error) => next(error));
// });

// DistributionRouter.post("/", async (request, response, next) => {
//   const {
//     serial_number,
//     source,
//     destination,
//     batch,
//     low_range,
//     high_range,
//     start_date,
//     stop_date,
//     custodian,
//   } = request.body;

//   if (serial_number == undefined || custodian == undefined) {
//     return response.status(400).json({
//       error: "Content missing",
//     });
//   }

//   const distribution = {
//     serial_number,
//     source,
//     destination,
//     batch: Number(batch),
//     low_range: Number(low_range),
//     high_range: Number(high_range),
//     start_date: new Date(start_date),
//     stop_date: new Date(stop_date),
//     custodian,
//   };

//   await prisma.distribution_table
//     .create({
//       data: distribution,
//     })
//     .then((saved) => saved.toJSON())
//     .then((result) => response.status(201).json(result))
//     .catch((error) => next(error));
// });
