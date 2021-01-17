const DrugRouter = require("express").Router();
const Drug = require("../models/drug");

// ##################################################################################### //
// #############################           DRUGS           ############################# //
// ##################################################################################### //
DrugRouter.get("/", async (request, response) => {
  const drugs = await Drug.find({});

  response.json(drugs);
});

DrugRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;

  Drug.findById(id)
    .then((drug) => {
      if (drug) {
        response.json(drug);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

DrugRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;

  Drug.findByIdAndDelete(id)
    .then((drug) => {
      response.json(drug);
    })
    .catch((error) => next(error));
});

DrugRouter.put("/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const DrugModel = {
    serial: body.serial,
    drug_name: body.drug_name,
    manufacture_date: body.manufacture_date,
    expiry_date: body.expiry_date,
    nafdac_no: body.nafdac_no,
    net_weight: body.net_weight,
    type: body.type,
    producer: body.producer,
  };

  Drug.findByIdAndUpdate(id, DrugModel, { new: true })
    .then((drug) => {
      response.json(drug.toJSON());
    })
    .catch((error) => next(error));
});

DrugRouter.post("/", (request, response, next) => {
  const body = request.body;

  if (body.serial == undefined || body.drug_name == undefined) {
    return response.status(400).json({ error: "Content missing" });
  }

  const drug = new Drug({
    serial: body.serial,
    drug_name: body.drug_name,
    manufacture_date: body.manufacture_date,
    expiry_date: body.expiry_date,
    nafdac_no: body.nafdac_no,
    net_weight: body.net_weight,
    type: body.type,
    producer: body.producer,
  });

  drug
    .save()
    .then((saved) => saved.toJSON())
    .then((result) => response.status(201).json(result))
    .catch((error) => next(error));
});

module.exports = DrugRouter;
