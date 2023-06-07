const request = require("supertest");
const app = require("../app");

let userId;
let token;

test("POST /users should create a user", async () => {
  const user = {
    id: 2,
    firstName: "sendy",
    lastName: "neisca",
    email: "yelisca%@gmail.com",
    password: "$2b$10$H",
    phone: "36222737",
  };
  const res = await request(app).post("/users").send(user);
  userId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("POST /users/login should do login", async () => {
  const credentials = {
    email: "yelisca%@gmail.com",
    password: "$2b$10$H",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

test("GET /users should return all the users", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(2);
});

test("PUT /users/:id should update a user", async () => {
  const updatedUser = {
    firstName: "Kenny",
  };
  const res = await request(app)
    .put(`/users/${userId}`)
    .send(updatedUser)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedUser.firstName);
});

test("POST /users/login should throw an error", async () => {
  const credentials = {
    email: "yeliscdda%@gmail.com",
    password: "$dd2b$10$H",
  };
  const res = await request(app).post("/users/login").send(credentials);
  expect(res.status).toBe(401);
});

test("DELETE /users should delete a user", async () => {
  const res = await request(app)
    .delete(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
