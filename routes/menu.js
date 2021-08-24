var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
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
    let _id = req.body._id;
    let name = req.body.name;
    let level = req.body.level;
    if (!_id || !name) {
      res.status(400).send({ msg: "请求参数不对" });
      return;
    }
    db.modal({ name: String, level: String }, "product").then((modal) => {
      db.find(modal, { _id: mongoose.Types.ObjectId(_id) }).then((data) => {
          console.log(data);
          db.update(modal, {_id: mongoose.Types.ObjectId(_id)}, {name: name}).then(doc => {
            res.send({msg: '修改分类成功'});
        }, e => {
            res.status(500).send({msg: '更新类别报错'})
        })
      });
    });
  });

router.get("/list", function (req, res, next) {
  db.modal({ key: String, title: String, icon: String, submenus: Array }, "menu").then((modal) => {
    db.find(modal, {}).then((data) => {
      res.send(data);
    });
  });
});

module.exports = router;
