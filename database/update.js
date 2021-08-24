module.exports = function (modal, data, updata) {
  // 将文档插入到数据库，save方法返回一个Promise对象。
  return modal.updateMany(data, updata);
};
