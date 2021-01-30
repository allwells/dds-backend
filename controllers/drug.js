const DrugRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const Drug = require("../models/drug");

DrugRouter.get("/", async (req, res) => {
  const drug = await Drug.find({});
  res.json(drug);
});

DrugRouter.get("/:serial_number", async (req, res, next) => {
  const serial = req.params.serial_number;
  const drug = await Drug.findById(serial);

  drug
    .then((drugs) => {
      if (drugs) {
        res.json(drugs);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

DrugRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (
    body.serial_number == undefined ||
    body.drug_name == undefined ||
    body.manufacture_date == undefined ||
    body.expiry_date == undefined ||
    body.nafdac_reg_no == undefined ||
    body.net_weight == undefined ||
    body.type == undefined ||
    body.producer == undefined
  ) {
    return res.status(400).json({ error: "Content missing" });
  }

  const drug = new Drug({
    serial_number: body.serial_number,
    drug_name: body.drug_name,
    manufacture_date: body.manufacture_date,
    expiry_date: body.expiry_date,
    nafdac_reg_no: body.nafdac_reg_no,
    net_weight: body.net_weight,
    type: body.type,
    producer: body.producer,
  });

  drug
    .save()
    .then((saved) => saved.toJSON())
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

module.exports = DrugRouter;

// const prisma = new PrismaClient();

// DrugRouter.get("/", async (request, response) => {
//   const drugs = await prisma.drug_table.findMany();

//   response.json(drugs);
// });

// DrugRouter.get("/:serial_number", async (request, response, next) => {
//   const serial_number = request.params.serial_number;

//   await prisma.drug_table
//     .findUnique({
//       where: { serial_number: serial_number },
//     })
//     .then((drug) => {
//       if (drug) {
//         response.json(drug);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

// DrugRouter.delete("/:serial_number", async (request, response, next) => {
//   const serial_number = request.params.serial_number;

//   await prisma.drug_table
//     .delete({
//       where: { serial_number: serial_number },
//     })
//     .then((drug) => {
//       response.json(drug);
//     })
//     .catch((error) => next(error));
// });

// DrugRouter.put("/:serial_number", async (request, response, next) => {
//   const {
//     serial_number,
//     drug_name,
//     manufacture_date,
//     expiry_date,
//     nafdac_no,
//     net_weight,
//     type,
//     producer,
//   } = request;

//   const drug = {
//     serial_number,
//     drug_name,
//     manufacture_date,
//     expiry_date,
//     nafdac_no,
//     net_weight,
//     type,
//     producer,
//   };

//   await prisma.drug_table
//     .update({
//       where: { serial_number: serial_number },
//       data: drug,
//     })
//     .then((drugs) => {
//       response.json(drugs.toJSON());
//     })
//     .catch((error) => next(error));
// });

// DrugRouter.post("/", async (request, response, next) => {
//   const {
//     serial_number,
//     drug_name,
//     manufacture_date,
//     expiry_date,
//     nafdac_no,
//     net_weight,
//     type,
//     producer,
//   } = request.body;

//   const exists = await prisma.drug_table.findUnique({
//     where: { serial_number: serial_number },
//   });

//   if (serial_number == undefined || drug_name == undefined) {
//     return response.status(400).json({ error: "Content missing" });
//   }

//   if (exists) {
//     return response.status(401).json({ error: "Drug already exists" });
//   }

//   const drug = {
//     serial_number,
//     drug_name,
//     manufacture_date,
//     expiry_date,
//     nafdac_no,
//     net_weight,
//     type,
//     producer,
//   };

//   await prisma.drug_table
//     .create({
//       data: drug,
//     })
//     .then((saved) => saved.toJSON())
//     .then((result) => response.status(201).json(result))
//     .catch((error) => next(error));
// });
