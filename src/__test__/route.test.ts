import app from "../server";
import server from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("Get / shoud return hello", async () => {
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("Hello");
  });
});
