var express = require("express");
var fs = require('fs');
var router = express.Router();
var mongoose = require("mongoose");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

let db = global.db;

let config = {
  productName: String,
  productDescribe: String,
  productPrice: String,
  productType: String,
};

router.post("/add", function (req, res, next) {
  let { productDescribe, productName, productPrice, productType } = req.body;
  if (!productDescribe || !productName || !productPrice || !productType) {
    res.status(400).send({ msg: "请求参数不对" });
    return;
  }
  db.modal(config, "product").then((modal) => {
    db.find(modal, { productName }).then((data) => {
      if (!data.length) {
        db.insert(modal, { ...req.body }).then((doc) => {
          res.send({ msg: "该商品创建成功" });
        });
      } else {
        res.status(400).send({ msg: "已经存在该商品" });
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
      db.update(
        modal,
        { _id: mongoose.Types.ObjectId(_id) },
        { name: name }
      ).then(
        (doc) => {
          res.send({ msg: "修改分类成功" });
        },
        (e) => {
          res.status(500).send({ msg: "更新类别报错" });
        }
      );
    });
  });
});

router.get("/list", function (req, res, next) {
  db.modal(config, "product").then((modal) => {
    db.find(modal, {}).then((data) => {
      res.send(data);
    });
  });
});

router.post("/upload", upload.single("avatar"), function (req, res, next) {
  console.log(req.file);
  fs.renameSync(
    "./uploads/" + req.file.filename,
    "./uploads/" + req.file.originalname
  );
  // db.modal(config, "product").then((modal) => {
  //   db.find(modal, {}).then((data) => {
  //     res.send(data);
  //   });
  // });
});

module.exports = router;
