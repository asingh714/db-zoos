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
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json({ error: "The zoos could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res
          .status(404)
          .json({ error: "The zoo with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The zoo with the specified ID could not be retrieved."
      });
    });
});

module.exports = router;
