module.exports = function (modal, data) {
  // 通过实例化model创建文档
  let doc = new modal(data);

  // 将文档插入到数据库，save方法返回一个Promise对象。
  return doc.save();
};
