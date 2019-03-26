const knex = require("knex");
const express = require("express");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json({ error: "The bears could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where({ id })
    .first()
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res
          .status(404)
          .json({ error: "The bear with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The bear with the specified ID could not be retrieved."
      });
    });
});

router.post("/", (req, res) => {
  const bear = req.body;

  if (!bear.name) {
    res.status(400).json({
      error: "Please provide a name for the bear."
    });
  } else {
    db("bears")
      .insert(bear)
      .then(ids => {
        const id = ids[0];
        db("bears")
          .where({ id })
          .first()
          .then(bear => {
            res.status(201).json(bear);
          })
          .catch(error => {
            res.status(500).json({
              error: "There was an error while saving the bear to the database."
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
      error: "Please provide a name for the bear."
    });
  } else {
    db("bears")
      .where({ id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res
            .status(404)
            .json({
              message: "The bear with the specified ID does not exist."
            });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The bear information could not be modified."
        });
      });
  }
});

module.exports = router;
