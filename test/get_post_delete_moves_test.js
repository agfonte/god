const assert = require("assert");
const app = require('../server');

const request = require('supertest');

describe("Test insertion and delete moves", () => {
    it("Express can send correctly", async () => {
        const response = await request(app).get("/api/moves");
        assert(response.status === 200);
    })
    it("Post method can return correctly", async () => {
        const response = await request(app).post("/api/moves").send({
            move: ["killer", "killed"]
        });
        assert(response.status === 200);
        if (response.body.status === "OK") {
            assert(response.body.message === "Move killer -> killed saved");
        } else {
            assert(response.body.status === "Fail" && response.body.message === "Move already exists")
        }
    })
    it("Delete method can return correctly", async () => {
        const response = await request(app).delete("/api/moves").send({
            move: ["killer", "killed"]
        });
        assert(response.status === 200);
        assert(response.body.status === "OK");
    })
})