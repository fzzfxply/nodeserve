const Router = require("./Router");
const dataController = require("../controllers/dataController");
const { authenticateToken } = require("../utils/jwt");

const dataRouter = new Router();

// GET single data by ID
dataRouter.get("/api/data/:id", authenticateToken, (req, res, next) => {

  const id = req.params.id;
  const data = dataController.getDataById(id);

  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = 404;
    res.end(`Data with ID ${id} not found.`);
  }
  next();
});



// POST new data
dataRouter.post("/api/data/adddata", authenticateToken, (req, res, next) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newData = JSON.parse(body);
    const data = dataController.addData(newData);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  });
  next();
});
// GET all data
dataRouter.get("/api/data", authenticateToken, (req, res, next) => {

  const data = dataController.getDataByUser(req.user.username);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
  next();
});
// PUT update data by ID
dataRouter.put("/api/data/:putid", authenticateToken, (req, res, next) => {
  const id = req.params.id;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newData = JSON.parse(body);
    const data = dataController.updateData(id, newData);
    if (data) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } else {
      res.statusCode = 404;
      res.end(`Data with ID ${id} not found.`);
    }
  });
  next();
});

// 删除id
dataRouter.delete("/api/data/:deleteid", authenticateToken, (req, res, next) => {
  const id = req.params.id;
  const data = dataController.deleteData(id);
  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = 404;
    res.end(`Data with ID ${id} not found.`);
  }
  next();
});

module.exports = dataRouter;
