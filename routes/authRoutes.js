const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { authenticateUser } = require("../utils/dataUtils.js");
const { secretKey } = require("../utils/jwt.js");
const { addUser, login } = require("../controllers/authController.js");

const authRouter = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const method = req.method.toUpperCase();

  if (method === "POST" && reqUrl.pathname === "/api/login") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username, password } = JSON.parse(body);
      try {
        const token = login(username, password);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ token }));
      } catch (error) {
        res.statusCode = 401;
        res.end(error.message);
      }
    });
  } else if (method === "POST" && reqUrl.pathname === "/api/register") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      try {
        const user = addUser(newUser);
        const token = generateAccessToken(user);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ user, token }));
      } catch (error) {
        res.statusCode = 400;
        res.end(error.message);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

module.exports = authRouter;
