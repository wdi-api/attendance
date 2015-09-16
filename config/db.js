

var mongoose = require('mongoose')
var _ = require("underscore")
mongoose.connect('mongodb://localhost/attendance', function(){
      //mongoose.connection.db.dropDatabase()
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connection established to: ", db.name)
});


module.exports = mongoose
