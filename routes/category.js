var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
let db = global.db;

router.post("/add", function (req, res, next) {
  let name = req.body.name;
  let level = req.body.level;
  if (!name || !level) {
    res.status(400).send({ msg: "请求参数不对" });
    return;
  }
  db.modal({ name: String, level: String }, "category").then((modal) => {
    db.find(modal, { level: level, name: name }).then((data) => {
      if (!data.length) {
        db.insert(modal, { name, level }).then((doc) => {
          res.send({ msg: "创建成功" });
        });
      } else {
        res.status(400).send({ msg: "已经存在该分类" });
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
    db.modal({ name: String, level: String }, "category").then((modal) => {
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
  let level = req.query.level;
  db.modal({ name: String, level: String }, "category").then((modal) => {
    db.find(modal, level ? { level: level } : {}).then((data) => {
      res.send(data);
    });
  });
});

module.exports = router;
