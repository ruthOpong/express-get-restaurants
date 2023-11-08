const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.use(express.json());
app.use(express.urlencoded());

app.get('/restaurants/:id', async (request, response) => {
    let restId = request.params.id;
    let rest = await Restaurant.findByPk(restId);
    console.log(rest);
    response.json(rest);
})

app.post('/restaurants/:id', async (request, response) => {
    await Restaurant.create(request.body);
    response.send("resource successfully updated");
})

app.put('/restaurants/:id', async (request, response) => {
    let restId = request.params.id;
    let rest = await Restaurant.findByPk(restId);
    await rest.update(request.body);
    response.send("resource successfully updated");
})

app.delete('/restaurants/:id', async (request, response) => {
    let restId = request.params.id;
    let rest = await Restaurant.findByPk(restId);
    rest.destroy();
    response.send("resource successfully deleted");
})

module.exports = app;