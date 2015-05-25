var express = require("express")
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
var mongoose = require('mongoose')
var _ = require("underscore")
mongoose.connect('mongodb://localhost/attendance', function(){
      //mongoose.connection.db.dropDatabase()
});
var Event = mongoose.model('Event', { studentId: String, weekday: String, status: String })

app.get("/attendance/", function( req, res ){
  Event.find({}, function( err, docs ){
    res.send(docs)
  })
})

app.get("/attendance/:weekday", function( req, res ){
  Event.find({weekday: req.params.weekday}, function( err, docs ){
    res.send(docs)
  })
})

app.get("/attendance/students/:studentId", function( req, res ){
  Event.find({studentId: req.params.studentId}, function( err, docs ){
    res.send(docs)
  })
})

app.post("/attendance/", function( req, res ){
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

app.listen(2371, function(){
  console.log("app running on port 3000")
})