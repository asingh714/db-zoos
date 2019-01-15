const express = require('express');
const knex = require("knex");
const helmet = require('helmet');

const knexConfig = require('./knexfile.js');
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
    }) 
  } else {
    db("zoos").insert(zoo)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the zoo to the database." })
    })
  }

})

// GET - READ 
server.get("/api/zoos", (req, res) => {
  db("zoos")
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => {
    res.status(500).json({ error: "The zoos could not be retrieved." })
  })
})







const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
