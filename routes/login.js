var express = require("express");
var router = express.Router();
let db = global.db;

router.post("/", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  db.modal({ userName: String, pwd: String }, "user").then((modal) => {
    db.find(modal, { userName: username }).then((data) => {
      let userData = data.find(
        (user) => user.userName === username && user.pwd === password
      );
      if (userData) {
        res.send({ msg: username + "用户登录成功", gonext: true });
      } else {
        res
          .status(400)
          .send({ msg: "用户名或密码错误，请重试", gonext: false });
      }
    });
  });
});

module.exports = router;
