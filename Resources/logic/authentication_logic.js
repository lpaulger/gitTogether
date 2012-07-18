Ti.include('/lib/basic_authentication.js');

var basicAuth = new BasicAuth();

exports.authorize = function(username, password, callback) {

	var hasAuthToken = false;

	basicAuth.loadAccessToken('github');

	// if the client is not authorized, see if authorization exists, then use that token, otherwise ask for authorization.
	if (basicAuth.isAuthorized() == false) {

		// this function will be called as soon as the application is authorized
		var saveToken = function(response) {
			// save the access token
			if (response == true) {
				Ti.API.debug("response: " + response);
				Ti.API.debug("username: " + username);
				Ti.App.Properties.setString('username', username);
			} else {
				Ti.API.debug("save AuthToken failure");
			}
			callback(response);
		};

		var getToken = function(response) {
			Ti.API.debug("Response: ");
			Ti.API.debug(response);
			if (response == true || response == false) {
				hasAuthToken = response;
				var currentToken = Ti.App.Properties.getString('github_token');
				Ti.API.debug("current token: " + currentToken);
				Ti.API.debug("hasAuthToken: " + hasAuthToken);
				if (hasAuthToken == true) {
					Ti.API.debug("current Token is not null or not undefined");
					Ti.App.Properties.setString('username', username);
				} else {
					Ti.API.debug("No github api application matching");
					basicAuth.createAccessToken("https://api.github.com/authorizations", username, password, saveToken);
				}
				callback(true);
			} else {
				callback(false);
			}
		};

		//look for existing token
		var currentToken = basicAuth.getActiveToken("https://api.github.com/authorizations", username, password, getToken);

	} else {
		alert("basicAuth.isAuthorized() = true");
	}
}
/*
 * This function checks to see if the users token is still valid. If not the user has to authenticate the application again.
 */
exports.isValidToken = function() {
	return basicAuth.isAuthorized();
}
