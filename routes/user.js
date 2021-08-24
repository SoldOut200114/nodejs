var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

let db = global.db;
let config = {
  userName: String,
  email: String,
  tel: Number,
  createTime: Number,
  role: String,
};

function getRoleName(roles, item) {
  let _role = roles.find((role) => role._id == item.role);
  return _role.roleName;
}

router.post("/add", function (req, res, next) {
  let { userName, email, tel, createTime, role, pwd } = req.body;
  if (!userName || !pwd) {
    res.status(400).send({ msg: "请求参数不对" });
    return;
  }
  db.modal({ pwd: String, ...config }, "user").then((modal) => {
    db.find(modal, { userName }).then((data) => {
      if (!data.length) {
        db.insert(modal, { userName, email, tel, createTime, role, pwd }).then(
          (doc) => {
            res.send({ msg: "用户创建成功" });
          }
        );
      } else {
        res.status(400).send({ msg: "已经存在该用户" });
      }
    });
  });
});

router.post("/modify", function (req, res, next) {
  let { userName, email, tel, role, _id } = req.body;
  if (!userName || !_id) {
    res.status(400).send({ msg: "请求参数不对" });
    return;
  }
  db.modal(
    {
      ...config,
    },
    "user"
  ).then((modal) => {
    db.update(
      modal,
      { _id: mongoose.Types.ObjectId(_id) },
      { userName, email, tel, role }
    ).then(
      (doc) => {
        res.send({ msg: "修改用户信息成功" });
      },
      (e) => {
        res.status(500).send({ msg: "修改用户信息失败" });
      }
    );
  });
});

router.delete("/remove", function (req, res, next) {
  let { _id } = req.query;
  if (!_id) {
    res.status(400).send({ msg: "请求参数不对" });
    return;
  }
  db.modal(
    {
      ...config,
    },
    "user"
  ).then((modal) => {
    db.remove(modal, { _id: mongoose.Types.ObjectId(_id) }).then(
      (doc) => {
        res.send({ msg: "删除用户成功" });
      },
      (e) => {
        res.status(500).send({ msg: "删除用户失败" });
      }
    );
  });
});

router.get("/list", function (req, res, next) {
  db.modal(config, "user").then((modal) => {
    db.find(modal, {})
      .then((data) => {
        let _data = data.map((item) => {
          let { userName, email, tel, createTime, role, _id } = item;
          return {
            userName,
            email,
            tel,
            createTime,
            role,
            _id,
          };
        });
        return _data;
      })
      .then((data) => {
        db.modal({ roles: Array, roleName: String }, "role").then(
          (roleModal) => {
            db.find(roleModal, {}).then((roleData) => {
              let _data = data.map((item) => {
                item.roleName = getRoleName(roleData, item);
                return item;
              });
              res.send(_data);
            });
          }
        );
      });
  });
});

module.exports = router;
