const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

// POST - ADD
router.post("/", (req, res) => {
    const zoo = req.body;
  
    if (!zoo.name) {
      res.status(400).json({
        error: "Please provide a name for the zoo"
      });
    } else {
      db("zoos")
        .insert(zoo)
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: "There was an error while saving the zoo to the database."
            });
        });
    }
  });
  
  // GET - READ
  router.get("/", (req, res) => {
    db("zoos")
      .then(zoos => {
        res.status(200).json(zoos);
      })
      .catch(err => {
        res.status(500).json({ error: "The zoos could not be retrieved." });
      });
  });
  
  // GET - READ with specific ID
  router.get("/:id", (req, res) => {
    const id = req.params.id;
  
    db("zoos")
      .where({ id: id })
      .then(zoo => {
        if (zoo) {
          res.status(200).json(zoo);
        } else {
          res
            .status(404)
            .json({ error: "The zoo with the specified ID was not found" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "This zoo with the specified ID does not exist." });
      });
  });
  
  // DELETE
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    db("zoos")
      .where({ id: id })
      .del()
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ error: "The zoo could not be removed." });
      });
  });
  
  // PUT - UPDATE
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
  
    db("zoos")
      .where({ id: id })
      .update(changes)
      .then(zoo => {
        if (zoo) {
          res.status(200).json(zoo);
        } else {
          res
            .status(404)
            .json({ error: "Please provide an ID and name for the zoo." });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "The zoo information could not be modified."
        });
      });
  });

  module.exports = router;