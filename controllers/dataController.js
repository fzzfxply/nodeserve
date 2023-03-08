const fs = require("fs");
const path = require("path");

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
  console.log(data,"readData",id)
  return data.find((item) => item.id === id);
}

function addData(newData) {
  const data = readData();
  newData.id = Date.now().toString(); // 为新数据分配唯一ID
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
function getDataByUser(username) {
  console.log(username,"username")
  return readData().filter((item) => item.user === username);
}
function deleteData(id) {
  const data = readData();
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    const deleted = data.splice(index, 1);
    writeData(data);
    return deleted[0];
  }
  return null;
}

module.exports = {
  readData,
  writeData,
  getDataById,
  addData,
  updateData,
  getDataByUser,
  deleteData,
};
