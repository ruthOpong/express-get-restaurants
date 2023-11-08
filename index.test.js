// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Restaurants } = require('./models/index')
const app = require('./src/app');
const seedRestaurants = require("./seedData");

describe('./restaurants endpoint', () => {
    test("Restaurant - check status", async () => {
        const response = await request(app).get("/Restaurant");
        expect(response.status).toBe(200);
    })
})
