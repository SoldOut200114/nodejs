// app.js
var mongoose = require('mongoose');            

mongoose.connect('mongodb://localhost/mrpan', { useNewUrlParser: true, useUnifiedTopology: true })     //连接本地数据库blog 

var db = mongoose.connection;

// 连接成功
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});
// 连接失败
db.on('error', function(){
    console.log('MongoDB Connection Error');
});

module.exports = db;
