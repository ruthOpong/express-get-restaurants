const express = require("express");
const router = express.Router();
const Restaurant = require("../models/index");
const { check, validationResult } = require("express-validator");

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', async (request, response) => {
    try{
    let rest = await Restaurant.findAll();
    //console.log(rest);
    response.json(rest);}
    catch (error){
        console.log(error);
    }
})

router.get('/:id', async (request, response, next) => {
    try{
        let restId = request.params.id;
        console.log(restId);
        let rest = await Restaurant.findByPk(restId);
        console.log(rest);
        response.json(rest);}
    catch (error) {
        console.log(error);
        next;
    }
})

router.post('/', [check("name").not().isEmpty().trim()],  [check("location").not().isEmpty().trim()],  [check("cuisine").not().isEmpty().trim()], async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()){
        response.json({error: errors.array()})
    } else {
    const restaurant = await Restaurant.create(request.body);
    response.json(JSON.stringify(restaurant));
    }
})

router.put('/:id', async (request, response) => {
    let restId = request.params.id;
    let rest = await Restaurant.findByPk(restId);
    const restaurant = await rest.update(request.body);
    response.json(JSON.stringify(restaurant));
})

router.delete('/:id', async (request, response) => {
    let restId = request.params.id;
    let rest = await Restaurant.findByPk(restId);
    rest.destroy();
    response.send("resource successfully deleted");
})

module.exports = router ;