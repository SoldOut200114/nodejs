let mongoose = require("mongoose");

// 导入连接模块
let db = require("./db");

function modal(options, name) {
  // 创建schema
  let schema = new mongoose.Schema(options);

  // 通过connection和schema创建model
  return new Promise((resolve, reject) => {
    resolve(db.model(name, schema, name + 's'))
  });
}

module.exports = modal;
