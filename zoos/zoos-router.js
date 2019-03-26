const knex = require("knex");
const express = require("express");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const db = knex(knexConfig);

const router = express.Router();

router.get("/", (req, res) => {
  db("zoos")
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(error => {
    res.status(500).json({ error: "The zoos could not be retrieved." })
  })
})

module.exports = router;