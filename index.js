var express = require("express")
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/attendance', function(){
      //mongoose.connection.db.dropDatabase()
});
var Event = mongoose.model('Event', { studentId: String, weekday: String, status: String });
app.get("/", function( req, res ){
  Event.find({}, function( err, docs ){
    res.send(docs)
  })
})

app.post("/", function( req, res ){
  var evt = new Event({ 
    studentId: req.body.studentId,
    weekday: req.body.weekday,
    status: req.body.status
  });
  evt.save(function (err) {
    if (err) // ...
      res.send(err)
    res.send( evt )
  });
})

app.listen(3000, function(){
  console.log("app running on port 3000")
})