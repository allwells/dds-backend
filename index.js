const express = require("express");
const app = express();

app.use(express.json());

let drugs = [
  {
    serial_number: 1,
    drug_name: "Panadol",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2498294984",
    net_weight: "45.2g",
    type: "Local",
    producer: "Drug Company",
  },
  {
    serial_number: 2,
    drug_name: "Emzor",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2423454984",
    net_weight: "32.0g",
    type: "Foreign",
    producer: "Drug Company",
  },
  {
    serial_number: 3,
    drug_name: "Paraceutamol",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2499276946",
    net_weight: "28.7g",
    type: "Local",
    producer: "Drug Company",
  },
  {
    serial_number: 4,
    drug_name: "Panadol",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2498294984",
    net_weight: "45.2g",
    type: "Local",
    producer: "Drug Company",
  },
  {
    serial_number: 5,
    drug_name: "Panadol",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2498294984",
    net_weight: "45.2g",
    type: "Local",
    producer: "Drug Company",
  },
  {
    serial_number: 6,
    drug_name: "Panadol",
    manufacture_date: "2019-05-30",
    expiry_date: "2020-06-29",
    nafdac_no: "NAF-2498294984",
    net_weight: "45.2g",
    type: "Local",
    producer: "Drug Company",
  },
  {
    serial_number: 7,
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

app.get("/api/drugs", (request, response) => {
  response.json(drugs);
});

app.get("/api/drugs/:serial_number", (request, response) => {
  const serialNumber = Number(request.params.serial_number);
  const drug = drugs.find((drug) => drug.serial_number === serialNumber);

  if (drug) {
    response.json(drug);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/drugs/:serial_number", (request, response) => {
  const serialNumber = Number(request.params.serial_number);
  drugs = drugs.filter((drug) => drug.serial_number !== serialNumber);

  response.status(204).end();
});

app.post("/api/drugs", (request, response) => {
  const drug = request.body;
  console.log(drug);

  response.json(drug);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
