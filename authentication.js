var request = require("request")
module.exports = function( accessToken, callback ){
  //get all instructors user ids
  function getInstructors( accessToken, callback ){
    request({
      url: "https://api.github.com/teams/1511667/members?access_token=" + accessToken,
      headers: {
        'User-Agent':'request'
      }
    }, function(err,res,body){
      callback(JSON.parse(body))
    }) 
  }
  //get user id
  function getUser( accessToken, callback ){
    request({
      url: "https://api.github.com/user?access_token=" + accessToken,
      headers: {
        'User-Agent':'request'
      }
    }, function(err,res,body){
      callback(JSON.parse(body))
    }) 
  }
  function contains( haystack, needle ){
    for( var i = 0; i < haystack.length; i++ ){
      if( haystack[i].id == needle.id ){
        return haystack[i]
      }
    }
    return false
  }
  return getInstructors( accessToken, function(instructors){
    return getUser( accessToken, function( user ){
      var authenticatedUser = contains( instructors, user ) 
      callback(authenticatedUser)
    }) 
  })
}