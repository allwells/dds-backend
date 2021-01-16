const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
morgan(":method :url :status :res[content-length] - :response-time ms :body");

let drugs = [
  {
    id: 1,
    serial_number: "1234567890",
    drug_name: "Panadol",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2498294984",
    net_weight: "45.2g",
    type: "Local",
    producer: "Drug Company",
  },
  {
    id: 2,
    serial_number: "1234567890",
    drug_name: "Emzor",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2423454984",
    net_weight: "32.0g",
    type: "Foreign",
    producer: "Drug Company",
  },
  {
    id: 3,
    serial_number: "1234567890",
    drug_name: "Paraceutamol",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2499276946",
    net_weight: "28.7g",
    type: "Local",
    producer: "Drug Company",
  },
];

let distributions = [
  {
    id: 1,
    serial_number: "1234567890",
    source: "London",
    destination: "Lagos",
    movement_date: "2021-01-16",
    arrival_date: "2021-03-22",
    custodian: "Drug Company",
  },
  {
    id: 2,
    serial_number: "1234567890",
    source: "Lagos",
    destination: "Abuja",
    movement_date: "2021-01-16",
    arrival_date: "2021-03-22",
    custodian: "Drug Company",
  },
  {
    id: 3,
    serial_number: "1234567890",
    source: "Abuja",
    destination: "Port Harcourt",
    movement_date: "2021-01-16",
    arrival_date: "2021-03-22",
    custodian: "Drug Company",
  },
];

app.get("/", (request, response) => {
  response.send("<h3>Drug Distribution System in Nigeria</h3>");
});

// ##################################################################################### //
// #############################           DRUGS           ############################# //
// ##################################################################################### //
app.get("/api/drugs", (request, response) => {
  response.json(drugs);
});

app.get("/api/drugs/:id", (request, response) => {
  const id = Number(request.params.id);
  const drug = drugs.find((drug) => drug.id === id);

  if (drug) {
    response.json(drug);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/drugs/:id", (request, response) => {
  const id = Number(request.params.id);
  drugs = drugs.filter((drug) => drug.id !== id);

  response.status(204).end();
});

const genId = () => {
  const max_id =
    drugs.length > 0 ? Math.max(...drugs.map((drug) => drug.id)) : 0;

  return max_id + 1;
};

app.post("/api/drugs", (request, response) => {
  const body = request.body;

  const exists = drugs.find(
    (drug) => drug.serial_number === body.serial_number
  );

  if (!body.serial_number) {
    return response.status(400).json({
      error: "Serial number missing!",
    });
  }

  if (exists) {
    return response.status(409).json({
      error: "Serial number already exits!",
    });
  }

  const drug = {
    id: genId(),
    serial_number: body.serial_number,
    drug_name: body.drug_name,
    manufacture_date: body.manufacture_date,
    expiry_date: body.expiry_date,
    nafdac_no: body.nafdac_no,
    net_weight: body.net_weight,
    type: body.type,
    producer: body.producer,
  };

  drugs = drugs.concat(drug);

  response.json(drug);
});

// ##################################################################################### //
// #########################          DISTRIBUTION           ########################### //
// ##################################################################################### //
app.get("/api/distributions", (request, response) => {
  response.send(distributions);
});

app.get("/api/distributions/:id", (request, response) => {
  const id = Number(request.params.id);
  const distribution = distributions.find(
    (distribution) => distribution.id === id
  );

  if (distribution) {
    response.json(distribution);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/distributions/:id", (request, response) => {
  const id = Number(request.params.id);

  const distribution = distributions.filter(
    (distribution) => distributions.id !== id
  );

  response.status(204).end();
});

const distIdGen = () => {
  max_id =
    distributions.length > 0
      ? Math.max(...distributions.map((dist) => dist.id))
      : 0;

  return max_id + 1;
};

app.post("/api/distributions", (request, response) => {
  const body = request.body;

  if (!body.serial_number) {
    return response.status(400).json({
      error: "Serial number missing!",
    });
  }

  const distribution = {
    id: distIdGen(),
    serial_number: body.serial_number,
    source: body.source,
    destination: body.destination,
    movement_date: body.movement_date,
    arrival_date: body.arrival_date,
    custodian: body.custodian,
  };

  distributions = distributions.concat(distribution);

  response.json(distributions);
});

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---");

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

app.use(requestLogger);
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
