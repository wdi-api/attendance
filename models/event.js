module.exports = function( db ){
  var Event = db.model('Event', { 
    githubUserId: String, 
    weekday: String, 
    status: String 
  })
  return Event
}
