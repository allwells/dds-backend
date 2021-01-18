const DrugRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { exec } = require("child_process");
const prisma = new PrismaClient();

DrugRouter.get("/", async (request, response) => {
  const drugs = await prisma.drug_table.findMany();

  response.json(drugs);
});

DrugRouter.get("/:serial_number", async (request, response, next) => {
  const serial_number = request.params.serial_number;

  await prisma.drug_table
    .findMany({
      where: { serial_number: serial_number },
    })
    .then((drugs) => {
      if (drugs) {
        response.json(drugs);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

DrugRouter.delete("/:serial_number", async (request, response, next) => {
  const serial_number = request.params.serial_number;

  await prisma.drug_table
    .deleteMany({
      where: { serial_number: serial_number },
    })
    .then((drugs) => {
      response.json(drugs);
    })
    .catch((error) => next(error));
});

DrugRouter.put("/:serial_number", async (request, response, next) => {
  const serial_number = request.params.serial_number;
  const body = request.body;

  const drug = {
    serial_number: body.serial_number,
    drug_name: body.drug_name,
    manufacture_date: body.manufacture_date,
    expiry_date: body.expiry_date,
    nafdac_no: body.nafdac_no,
    net_weight: body.net_weight,
    type: body.type,
    producer: body.producer,
  };

  await prisma.drug_table
    .updateMany({
      where: { serial_number: serial_number },
      data: drug,
    })
    .then((drugs) => {
      response.json(drugs.toJSON());
    })
    .catch((error) => next(error));
});

DrugRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const serial_number = request.params.serial_number;

  const exists = await prisma.drug_table.findMany({
    where: { serial_number: serial_number },
  });

  if (body.serial == undefined || body.drug_name == undefined) {
    return response.status(400).json({ error: "Content missing" });
  }

  if (exists) {
    return response.status(401).json({ error: "Already exists" });
  }

  const drug = {
    serial_number: body.serial_number,
    drug_name: body.drug_name,
    manufacture_date: body.manufacture_date,
    expiry_date: body.expiry_date,
    nafdac_no: body.nafdac_no,
    net_weight: body.net_weight,
    type: body.type,
    producer: body.producer,
  };

  await prisma.drug_table
    .create({
      data: drug,
    })
    .then((saved) => saved.toJSON())
    .then((result) => response.status(201).json(result))
    .catch((error) => next(error));
});

module.exports = DrugRouter;
