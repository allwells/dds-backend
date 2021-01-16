const DrugRouter = require("express").Router();
const Drug = require("../models/drug");

// ##################################################################################### //
// #############################           DRUGS           ############################# //
// ##################################################################################### //
DrugRouter.get("/api/drugs", (request, response) => {
  response.json(drugs);
});

DrugRouter.get("/api/drugs/:id", (request, response) => {
  const id = Number(request.params.id);
  const drug = drugs.find((drug) => drug.id === id);

  if (drug) {
    response.json(drug);
  } else {
    response.status(404).end();
  }
});

DrugRouter.delete("/api/drugs/:id", (request, response) => {
  const id = Number(request.params.id);
  drugs = drugs.filter((drug) => drug.id !== id);

  response.status(204).end();
});

const genId = () => {
  const max_id =
    drugs.length > 0 ? Math.max(...drugs.map((drug) => drug.id)) : 0;

  return max_id + 1;
};

DrugRouter.post("/api/drugs", (request, response) => {
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

// const blogRouter = require("express").Router();
// const Blog = require("../models/blog");

// blogRouter.get("/", async (request, response) => {
//   const blogs = await Blog.find({});

//   response.json(blogs);
// });

// blogRouter.get("/:id", (request, response, next) => {
//   const id = request.params.id;

//   Blog.findById(id)
//     .then((blog) => {
//       if (blog) {
//         response.json(blog);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

// blogRouter.delete("/:id", (request, response, next) => {
//   const id = request.params.id;

//   Blog.findByIdAndDelete(id)
//     .then((blogs) => {
//       response.json(blogs);
//     })
//     .catch((error) => next(error));
// });

// blogRouter.put("/:id", (request, response, next) => {
//   const id = request.params.id;
//   const body = request.body;

//   const blogModel = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   };

//   Blog.findByIdAndUpdate(id, blogModel, { new: true })
//     .then((blogs) => {
//       response.json(blogs.toJSON());
//     })
//     .catch((error) => next(error));
// });

// blogRouter.post("/", (request, response, next) => {
//   const body = request.body;

//   if (
//     body.title === undefined ||
//     body.url === undefined ||
//     body.author === undefined
//   ) {
//     return response.status(400).json({ error: "Content missing" });
//   }

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   });

//   blog
//     .save()
//     .then((saved) => saved.toJSON())
//     .then((result) => response.status(201).json(result))
//     .catch((error) => next(error));
// });

// module.exports = blogRouter;
