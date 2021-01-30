const UserRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const User = require("../models/user");

UserRouter.get("/", async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

UserRouter.get("/:email", async (req, res, next) => {
  const email = req.params.email;

  await User.find({ email: email })
    .then((users) => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

UserRouter.post("/", async (req, res, next) => {
  const body = req.body;

  if (
    body.email == undefined ||
    body.password == undefined ||
    body.company_name == undefined
  ) {
    return res.status(400).json({ error: "Content missing" });
  }

  const user = new User({
    full_name: body.full_name,
    company_name: body.company_name,
    email: body.email,
    password: body.password,
  });

  await user
    .save()
    .then((saved) => saved.toJSON())
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

module.exports = UserRouter;

// const prisma = new PrismaClient();

// UserRouter.get("/", async (request, response) => {
//   const user = await prisma.user_table.findMany();

//   response.json(user);
// });

// UserRouter.get("/:email", async (request, response, next) => {
//   const email = request.params.email;

//   await prisma.user_table
//     .findMany({
//       where: { email: email },
//     })
//     .then((users) => {
//       if (users) {
//         response.json(users);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

// UserRouter.delete("/:email", async (request, response, next) => {
//   const email = request.params.email;

//   await prisma.user_table
//     .deleteMany({
//       where: { email: email },
//     })
//     .then((users) => {
//       response.json(users);
//     })
//     .catch((error) => next(error));
// });

// UserRouter.put("/:email", async (request, response, next) => {
//   const email = request.params.email;
//   const body = request.params;

//   const user = {
//     full_name: body.full_name,
//     company_name: body.company_name,
//     email: body.email,
//     passowrd: body.passowrd,
//   };

//   await prisma.user_table
//     .updateMany({
//       where: { email: email },
//       data: user,
//     })
//     .then((users) => {
//       response.json(users.toJSON());
//     })
//     .catch((error) => next(error));
// });

// UserRouter.post("/", async (rerquest, response, next) => {
//   const body = request.body;
//   const email = request.params.email;

//   const exists = await prisma.drug_table.findMany({
//     where: { email: email },
//   });

//   if (body.email == undefined || body.company_name == undefined) {
//     return response.status(400).json({
//       error: "Content missing",
//     });
//   }

//   if (body.email != undefined && exists) {
//     return response.status(401).json({ error: "User already exists" });
//   }

//   const user = {
//     full_name: body.full_name,
//     company_name: body.company_name,
//     email: body.email,
//     password: body.passowrd,
//   };

//   await prisma.user_table
//     .create({
//       data: user,
//     })
//     .then((saved) => saved.toJSON())
//     .then((result) => response.status(201).json(result))
//     .catch((error) => next(error));
// });
