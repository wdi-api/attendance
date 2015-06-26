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

app.get("/attendance/?", function( req, res ){
  Event.distinct("weekday", function( err, docs ){
    var attendances = []
    for( var i = 0; i < docs.length; i++ ){
      attendances.push({weekday: docs[i], url:"http://api.wdidc.org/attendance/"+docs[i]}) 
    }
    res.jsonp(attendances)
  })
})

app.get("/attendance/students/:githubUserId", function( req, res ){
  Event.find({githubUserId: req.params.githubUserId}, function( err, docs ){
    res.jsonp(docs)
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