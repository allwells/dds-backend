const UserRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { request } = require("http");
const prisma = new PrismaClient();

UserRouter.get("/", async (request, response) => {
  const user = await prisma.user_table.findMany();

  response.json(user);
});

UserRouter.get("/:email", async (request, response, next) => {
  const email = request.params.email;

  await prisma.user_table
    .findMany({
      where: { email: email },
    })
    .then((users) => {
      if (users) {
        response.json(users);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

UserRouter.delete("/:email", async (request, response, next) => {
  const email = request.params.email;

  await prisma.user_table
    .deleteMany({
      where: { email: email },
    })
    .then((users) => {
      response.json(users);
    })
    .catch((error) => next(error));
});

UserRouter.put("/:email", async (request, response, next) => {
  const email = request.params.email;
  const body = request.params;

  const user = {
    full_name: body.full_name,
    company_name: body.company_name,
    email: body.email,
    passowrd: body.passowrd,
  };

  await prisma.user_table
    .updateMany({
      where: { email: email },
      data: user,
    })
    .then((users) => {
      response.json(users.toJSON());
    })
    .catch((error) => next(error));
});

UserRouter.post("/", async (rerquest, response, next) => {
  const body = request.body;
  const email = request.params.email;

  const exists = await prisma.drug_table.findMany({
    where: { email: email },
  });

  if (body.email == undefined || body.company_name == undefined) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  if (body.email != undefined && exists) {
    return response.status(401).json({ error: "User already exists" });
  }

  const user = {
    full_name: body.full_name,
    company_name: body.company_name,
    email: body.email,
    password: body.passowrd,
  };

  await prisma.user_table
    .create({
      data: user,
    })
    .then((saved) => saved.toJSON())
    .then((result) => response.status(201).json(result))
    .catch((error) => next(error));
});

module.exports = UserRouter;
