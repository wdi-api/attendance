var mongoose = require('mongoose')
var _ = require("underscore")
mongoose.connect('mongodb://localhost/attendance', function(){
      //mongoose.connection.db.dropDatabase()
});

module.exports = mongoose
