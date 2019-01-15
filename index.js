const express = require("express");
// const knex = require("knex");
const helmet = require("helmet");

// const knexConfig = require("./knexfile.js");

const zoosRouter = require("./zoos/zoosRouter")


const server = express();

server.use(express.json());
server.use(helmet());

// const db = knex(knexConfig.development);
server.use("/api/zoos", zoosRouter);




const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
