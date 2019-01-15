const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

// POST - ADD
router.post("/", (req, res) => {
  const bear = req.body;

  if (!bear.name) {
    res.status(400).json({
      error: "Please provide a name for the bear"
    });
  } else {
    db("bears")
      .insert(bear)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the bear to the database."
        });
      });
  }
});

// GET - READ 
router.get("/")

module.exports = router;
