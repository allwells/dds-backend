const DistributionRouter = require("express").Router();
const Distribution = require("../models/distribution");

DistributionRouter.get("/api/distributions", (request, response) => {
  response.send(distributions);
});

DistributionRouter.get("/api/distributions/:id", (request, response) => {
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

DistributionRouter.delete("/api/distributions/:id", (request, response) => {
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

DistributionRouter.post("/api/distributions", (request, response) => {
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
