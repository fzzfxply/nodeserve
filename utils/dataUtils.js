const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "..", "users.json");

const dataPath = path.join(__dirname, "..", "data.json");

function readData() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data:", err);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function getDataById(id) {
  const data = readData();
  return data.find((item) => item.id === id);
}

function addData(newData) {
  const data = readData();
  newData.id = Date.now().toString();
  data.push(newData);
  writeData(data);
  return newData;
}

function updateData(id, newData) {
  const data = readData();
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...newData };
    writeData(data);
    return data[index];
  }
  return null;
}

function deleteData(id) {
  const data = readData();
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1);
    writeData(data);
    return deletedItem[0];
  }
  return null;
}
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
  readData,
  writeData,
  getDataById,
  addData,
  updateData,
  deleteData,
  authenticateUser,
};
