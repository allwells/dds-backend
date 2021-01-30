require("dotenv").config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  PORT,
  DATABASE_URL,
  MONGODB_URI,
};
