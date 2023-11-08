//install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const Restaurants = require('./models/index')
const app = require('./src/app');
const seedRestaurants = require("./seedData");

describe('./restaurants endpoint', () => {
    let restQuantity;
    beforeAll(async () => {
        restQuantity = (await Restaurants.findAll()).length;
        console.log(restQuantity);
    })

    test("Restaurant - check status", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.status).toBe(200);
    })
    test("Restaurant - check array", async () => {
        const response = await request(app).get("/restaurants");
        const allRest = await Restaurants.findAll({});
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('name');
    })
    test("Restaurant - check array length", async () => {
        const response = await request(app).get("/restaurants");
        const allRest = await Restaurants.findAll({});
        const num = allRest.length;
        expect(response.body.length).toBe(num);
    })
    test("Restaurants return specific ID", async () => {
        const response = await request(app).get("/restaurants/1");
        const allRest = await Restaurants.findByPk(1);
        expect(response.body.name).toEqual(allRest.name);
    })
    test("new restaurant", async () => {
        const response = await request(app).post("/restaurants").send({name: "KFC", location: "Kentuky", cuisine: "chicken"});
        const rest = await Restaurants.findAll();
        expect(restQuantity + 1).toEqual(rest.length);
    })
})
