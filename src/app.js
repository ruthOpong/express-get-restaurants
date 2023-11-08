const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const restRouter = require("D:/Multiverse/express-get-restaurants/routes/routes.js");

app.use("/restaurants", restRouter);

//TODO: Create your GET Request Route Below: 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

module.exports = app;