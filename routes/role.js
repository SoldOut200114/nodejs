var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
let db = global.db;

router.post("/add", function (req, res, next) {
  let { roleName, createTime } = req.body;
  if (!roleName || !createTime) {
    res.status(400).send({ msg: "请求参数不对" });
    return;
  }
  db.modal({ roleName: String, createTime: Number }, "role").then((modal) => {
    db.find(modal, { roleName }).then((data) => {
      if (!data.length) {
        db.insert(modal, { roleName, createTime }).then((doc) => {
          res.send({ msg: "创建成功" });
        });
      } else {
        res.status(400).send({ msg: "已经存在该角色" });
      }
    });
  });
});

router.post("/update", function (req, res, next) {
  let { roleId, roles, powerTime, powerOwn } = req.body;
  if (!roleId || !roles || !powerTime || !powerOwn) {
    res.status(400).send({ msg: "请求参数不对" });
    return;
  }
  db.modal({ roleName: String, createTime: Number, roles: Array, powerTime: Number, powerOwn: String }, "role").then((modal) => {
    db.find(modal, { _id: mongoose.Types.ObjectId(roleId) }).then((data) => {
      db.update(
        modal,
        { _id: mongoose.Types.ObjectId(roleId) },
        { roles, powerTime, powerOwn }
      ).then(
        (doc) => {
          res.send({ msg: "设置角色权限成功" });
        },
        (e) => {
          res.status(500).send({ msg: "设置角色权限错误" });
        }
      );
    });
  });
});

router.get("/list", function (req, res, next) {
  db.modal({ roleName: String, createTime: Number }, "role").then((modal) => {
    db.find(modal, {}).then((data) => {
      res.send(data);
    });
  });
});

module.exports = router;
