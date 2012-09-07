var auth = require("logic/authentication_logic");
var Window;
function HandheldApplication(){
	Ti.API.debug("is valid token: " + auth.isValidToken());
	if(auth.isValidToken()){
		Window = require('ui/handheld/ApplicationWindow');
	}
	else{
		Window = require('ui/handheld/LoginWindow');
	}
	
	return Window();
}

module.exports = HandheldApplication;