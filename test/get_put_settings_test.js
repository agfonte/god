const assert = require("assert");
const app = require('../server');

const request = require('supertest');

describe("Test insertion and updating settings", () => {
    it("Express can send correctly", async () => {
        const response = await request(app).get("/api/settings");
        assert(response.status === 200);
    })
    it("Put method can return correctly", async () => {
        let top = Math.floor(Math.random() * 100);
        const response = await request(app).put("/api/settings").send({
            top
        });
        assert(response.status === 200);
        assert(response.body.status === "OK");
        assert(response.body.message === "Tops player amount changed to:" + top)
    })
})