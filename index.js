const express = require("express");
const app = express();

app.use(express.json());

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
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
    serial_number: "1234567890",
    drug_name: "Panadol",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2498294984",
    net_weight: "45.2g",
    type: "Local",
    producer: "Drug Company",
  },
];

app.get("/", (request, response) => {
  response.send("<h3>Hello World</h3>");
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

  if (!body.serial_number) {
    return response.status(400).json({
      error: "Serial number missing!",
    });
  }

  const drug = {
    id: idGen,
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

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
