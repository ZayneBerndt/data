exports.checkSession = function(req){
  var verified;
  if(req.headers.token){
    var token = req.headers.token;
    if(token is verified){
      verified = true;
    } else {
      verified = false;
    }
  } else {
    verified = false;
  }
  return verified
}
exports.createSession = function(userId){

  return token
}
