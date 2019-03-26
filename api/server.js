const express = require('express');
const helmet = require('helmet');

const zoosRouter = require("../zoos/zoos-router");
const bearsRouter = require("../bears/bears-router");


const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/zoos", zoosRouter);
server.use("/api/bears", bearsRouter);



module.exports = server;
