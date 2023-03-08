const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "..", "users.json");
function authenticateUser(username, password) {
  const users = readUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return Boolean(user);
}
function readUsers() {
  console.log(usersPath, "userpath");
  try {
    const data = fs.readFileSync(usersPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users:", err);
    return [];
  }
}

module.exports = {

  authenticateUser,
};
