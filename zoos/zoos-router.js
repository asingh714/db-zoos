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

router.post("/", (req, res) => {
  const zoo = req.body;

  if (!zoo.name) {
    res.status(400).json({
      error: "Please provide a name for the zoo."
    });
  } else {
    db("zoos")
      .insert(zoo)
      .then(ids => {
        const id = ids[0];
        db("zoos")
          .where({ id })
          .first()
          .then(zoo => {
            res.status(201).json(zoo);
          })
          .catch(error => {
            res.status(500).json({
              error: "There was an error while saving the zoo to the database."
            });
          });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.name) {
    res.status(400).json({
      error: "Please provide a name for the zoo."
    });
  } else {
    db("zoos")
      .where({ id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res
            .status(404)
            .json({ message: "The zoo with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});




module.exports = router;
