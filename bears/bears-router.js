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


module.exports = router;