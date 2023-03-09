const http = require("http");
const url = require("url");
const { generateToken } = require("./utils/jwt");

const dataRouter = require("./routes/dataRoutes.js");

const { addUser, login } = require("./controllers/authController.js");
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const method = req.method.toUpperCase();

  if (method === "OPTIONS") {
    // 处理预检请求
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": 86400,
    });
    res.end();
    return;
  }

  // 设置跨域响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 路由分发
  if (reqUrl.pathname.startsWith("/api/register")) {
    if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { username, password } = JSON.parse(body);
        try {
          const token = generateToken(username);
          addUser(username, password);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ token }));
        } catch (err) {
          res.statusCode = 400;
          res.end(err.message);
        }
      });
    } else {
      res.statusCode = 405;
      res.end("Method not allowed");
    }
  } else if (reqUrl.pathname.startsWith("/api/login")) {
    if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { username, password } = JSON.parse(body);
        const getToken = login(username, password);

        if (getToken) {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ getToken }));
        } else {
          res.statusCode = 401;
          res.end("Invalid username or password");
        }
      });
    } else {
      res.statusCode = 405;
      res.end("Method not allowed");
    }
  } else if (/^\/api\/data(\/.*)?$/.test(reqUrl.pathname)) {
    // 匹配 /api/data 和 /api/data/:id
    dataRouter.handle(req, res);
  } else {
    res.statusCode = 405;
    res.end("Not found");
  }
  //   dataRouter.handle(req, res);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
