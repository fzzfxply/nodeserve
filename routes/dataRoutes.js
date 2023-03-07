const Router = require("./Router");
const {
  getDataById,
  addData,
  updateData,
  deleteData,
  getDataByUser,
} = require("../controllers/dataController");
const { authenticateToken } = require("../utils/jwt.js");

const dataRouter = new Router();

dataRouter.get("/api/data/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const data = getDataById(id);
  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = 404;
    res.end(`Data with ID ${id} not found.`);
  }
});
// // 增加
dataRouter.post("/api/data", authenticateToken, (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newData = JSON.parse(body);
    const data = addData(newData);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  });
});
// 查询所有
dataRouter.get("/api/data", authenticateToken, (req, res) => {
  console.log("getData request received"); // 在控制台输出调试信息
  const data = getDataByUser(req.user.username);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

// 修改
dataRouter.put("/api/data/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newData = JSON.parse(body);
    const data = updateData(id, newData);
    if (data) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } else {
      res.statusCode = 404;
      res.end(`Data with ID ${id} not found.`);
    }
  });
});

dataRouter.delete("/api/data/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const data = deleteData(id);
  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = 404;
    res.end(`Data with ID ${id} not found.`);
  }
});

module.exports = dataRouter;
