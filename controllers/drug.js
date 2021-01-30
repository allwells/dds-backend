const DrugRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

DrugRouter.get("/", async (request, response) => {
  const drugs = await prisma.drug_table.findMany();

  response.json(drugs);
});

DrugRouter.get("/:serial_number", async (request, response, next) => {
  const serial_number = request.params.serial_number;

  await prisma.drug_table
    .findUnique({
      where: { serial_number: serial_number },
    })
    .then((drug) => {
      if (drug) {
        response.json(drug);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

DrugRouter.delete("/:serial_number", async (request, response, next) => {
  const serial_number = request.params.serial_number;

  await prisma.drug_table
    .delete({
      where: { serial_number: serial_number },
    })
    .then((drug) => {
      response.json(drug);
    })
    .catch((error) => next(error));
});

DrugRouter.put("/:serial_number", async (request, response, next) => {
  const {
    serial_number,
    drug_name,
    manufacture_date,
    expiry_date,
    nafdac_no,
    net_weight,
    type,
    producer,
  } = request;

  const drug = {
    serial_number,
    drug_name,
    manufacture_date,
    expiry_date,
    nafdac_no,
    net_weight,
    type,
    producer,
  };

  await prisma.drug_table
    .update({
      where: { serial_number: serial_number },
      data: drug,
    })
    .then((drugs) => {
      response.json(drugs.toJSON());
    })
    .catch((error) => next(error));
});

DrugRouter.post("/", async (request, response, next) => {
  const {
    serial_number,
    drug_name,
    manufacture_date,
    expiry_date,
    nafdac_no,
    net_weight,
    type,
    producer,
  } = request;


  const exists = await prisma.drug_table.findUnique({
    where: { serial_number: serial_number },
  });

  if (serial_number == undefined || drug_name == undefined) {
    return response.status(400).json({ error: "Content missing" });
  }

  if (exists) {
    return response.status(401).json({ error: "Drug already exists" });
  }

  const drug = {
    serial_number,
    drug_name,
    manufacture_date,
    expiry_date,
    nafdac_no,
    net_weight,
    type,
    producer,
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
