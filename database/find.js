module.exports = function (modal, data) {
  // 将文档插入到数据库，save方法返回一个Promise对象。
  return modal.find(data);
};
