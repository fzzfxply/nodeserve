const { generateToken } = require("../utils/jwt.js");
const { authenticateUser } = require("../utils/dataUtils");
const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "..", "users.json");


function login(username, password) {
  const user = authenticateUser(username, password);
  if (user) {
    const token = generateToken({ username });
    return token;
  } else {
    throw new Error("Authentication failed");
  }
}

function addUser(username, password) {
  if (!username || !password) {
    throw new Error("Username and password are required.");
  }
  console.log(usersPath)
  const users = JSON.parse(fs.readFileSync(usersPath));
  const exists = users.find((user) => user.username === username);
  if (exists) {
    throw new Error("User already exists.");
  }
  const id = Date.now().toString();
  const newUser = { id, username, password };
  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  return newUser;
}
module.exports = { login, addUser };
