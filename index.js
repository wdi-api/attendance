var express = require("express")
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var db = require("./config/db")
var Event = require("./models/event")(db)
var authenticateUser = require("./authentication")

app.get("/attendance/:weekday", function( req, res ){
  Event.find({weekday: req.params.weekday}, function( err, docs ){
    res.jsonp(docs)
  })
})

app.get("/attendance/students/:studentId", function( req, res ){
  Event.find({githubUserId: req.params.studentId}, function( err, docs ){
    res.send(docs)
  })
})

app.post("/attendance/:weekday", function( req, res ){
  authenticateUser( req.query.access_token, function( currentUser ){
    if(currentUser){
      var evt = new Event({ 
	githubUserId: req.body.githubUserId,
	weekday: req.params.weekday,
	status: req.body.status
      });
      Event.findOneAndUpdate({
	weekday: req.params.weekday,
	githubUserId: req.body.githubUserId
      },{
	status: req.body.status
      },{
	new: true,
	upsert: true
      },function(err,evt){
	if (err) // ...
	  res.send(err)
	res.jsonp( evt )
      });
    }else{
      res.jsonp({
        error: "Not Authorized",
	documentation: "https://github.com/wdidc/api-attendance"
      })  
    }
  })
})

app.get("*", function( req, res ){
  res.jsonp({
    error: "Not found",
    documentation: "https://github.com/wdidc/api-attendance"
  })
})

app.listen(2371, function(){
  console.log("app running on port 2371")
})