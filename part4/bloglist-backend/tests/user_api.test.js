const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

jest.setTimeout(10000);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if password is less then 3 characters", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must have length of 3 or greater"
    );

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if username is less then 3 characters", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "sasss",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
