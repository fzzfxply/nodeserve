const jwt = require("jsonwebtoken");

// 密钥，用于生成和解析 token
const secretKey = "my_secret_key";

// 生成 token 的函数
function generateToken(payload, expiresIn = "1h") {
  console.log(payload, "expiresIn");
  if (!payload) {
    throw new Error("payload");
  }
  return jwt.sign(payload, secretKey, { expiresIn });
}

// 解析 token 的函数
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.error("Error verifying token:", err);
    return null;
  }
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(req.headers, "token");


  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
}

module.exports = { generateToken, verifyToken, authenticateToken };
