var db = require('./db')
var Event = require('../models/event.js')(db)

Event.remove({}, function(err){
  if (err) throw err;
})
bob = {githubUserId: 1}
Event.create({
  githubUserId: bob.githubUserId,
  weekday: "2015-09-16",
  status: "present"
})

Event.create({
  githubUserId: bob.githubUserId,
  weekday: "2015-09-17",
  status: "tardy"
})

Event.create({
  githubUserId: bob.githubUserId,
  weekday: "2015-09-18",
  status: "absent"
})

absent_tom = {githubUserId: 2}
Event.create({
  githubUserId: absent_tom.githubUserId,
  weekday: "2015-09-16",
  status: "present"
})

for(var i=0; i < (2*5); i++){
  var day = 17
  Event.create({
    githubUserId: absent_tom.githubUserId,

    weekday: "2015-09-" + (day + i),
    status: "tardy"
  })
}

console.log("Seeds complete.")
// TODO: db close?
process.exit
