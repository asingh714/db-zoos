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
router.get("/", (req,res) => {
    db("bears")
    .then(bears => {
        res.status(200).json(bears)
    })
    .catch(err => {
        res.status(500).json({ error: "The bears could not be retrieved." })
    })
})

// GET - READ with specific ID
router.get("/:id", (req, res) => {
    const id = req.params.id;
  
    db("bears")
      .where({ id: id })
      .then(bear => {
        if (bear) {
          res.status(200).json(bear);
        } else {
          res
            .status(404)
            .json({ error: "The bear with the specified ID was not found" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "This bear with the specified ID does not exist." });
      });
  });
  


module.exports = router;
