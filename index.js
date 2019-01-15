const express = require("express");
const knex = require("knex");
const helmet = require("helmet");

const knexConfig = require("./knexfile.js");
const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);

// POST - ADD
server.post("/api/zoos", (req, res) => {
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
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "The zoos could not be retrieved." });
    });
});

// GET - READ with specific ID
server.get("/api/zoos/:id", (req, res) => {
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
server.delete("/api/zoos/:id", (req, res) => {
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
server.put("/api/zoos/:id", (req, res) => {
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

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
