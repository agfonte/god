const assert = require("assert");
const app = require('../server');

const request = require('supertest');

describe("Test insertion, update and delete users", () => {
    it("Express can send correctly", async () => {
        const response = await request(app).get("/api/users");
        assert(response.status === 200);
    })
    it("Post method can return correctly", async () => {
        const response = await request(app).post("/api/users").send({
            user: "dummy",
            stats: {
                win: 0,
                lose: 0
            },
            games: []
        });
        assert(response.status === 200);
        assert(response.body.status === "OK");
    })
    it("Put method can return correctly", async () => {
        const response = await request(app).put("/api/users").send({
            name: "dummy",
            win: 0,
            lose: 0,
            against: "otherdummy"
        });
        assert(response.status === 200);
        console.log(response.body.status)
        assert(response.body.status === "OK");
    })
    it("Delete method can return correctly", async () => {
        const response = await request(app).delete("/api/users").send({
            name: "dummy",
        });
        assert(response.status === 200);
        assert(response.body.status === "OK");
    })
})