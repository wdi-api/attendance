module.exports = function( db ){
  var Event = db.model('Event', { 
    githubUserId: String, 
    weekday: String, 
    status: String,
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
  })
  return Event
}
