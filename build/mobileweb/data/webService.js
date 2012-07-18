var API_URL = "https://api.github.com/";
var TIMEOUT = 15000;

Ti.include('/lib/basic_authentication.js');
var basicAuth = new BasicAuth();

/**
 * Universal error method for all web service calls
 * @param {Object} error
 * @param {Object} url
 * @param {Object} status
 * @param {Object} responseText
 * @param {Object} callback
 */
var universalError = function(e, url, status, responseText, callback) {
	Ti.API.debug("URL: " + url);
	Ti.API.debug("STATUS: " + status);
	Ti.API.debug("TEXT:   " + responseText);
	Ti.API.debug("ERROR:  " + e.error);

	switch(status) {
		case 0:
			alert("the servers took to long to reply...");
			break;
		case 401:
			alert("401 - hmm, your credentials don't seem right, try again!");
			break;
		case 404:
			alert("404 - bad request!");
			break;
		default:
			if (responseText) {
				alert(responseText);
			} else {
				alert("hmm... something went horribly wrong!");
			}
	}

	callback(e);
}
/**
 * Make a get request to a url, returns json
 * @param {Object} url
 * @param {Object} callback
 */
exports.getRequest = function(url, callback) {
	var url = API_URL + url;
	var json;
	var token = Ti.App.Properties.getString('github_token');
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			//Ti.API.debug("responseText: ");
			//Ti.API.debug(this.responseText);

			json = JSON.parse(this.responseText);
			//Ti.API.info(json);
			if (callback) {
				//Ti.API.debug(json);
				callback(json);
			} else {
				return json;
			}
		},
		onerror : function(e) {
			universalError(e, url, this.status, this.responseText, callback);
		},
		timeout : TIMEOUT
	});
	xhr.open("GET", url);
	if (basicAuth.isAuthorized()) {
		authstr = 'Token ' + token;
		//Ti.API.debug(authstr);
		xhr.setRequestHeader('Authorization', authstr);
	}
	xhr.send();
}
/**
 * Make a POST request with a body message
 * @param {Object} url
 * @param {Object} body
 * @param {Object} callback
 */
exports.postRequest = function(url, body, callback) {
	var url = API_URL + url;
	var json;

	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			// Ti.API.debug(this.responseText);

			json = JSON.parse(this.responseText);
			//Ti.API.info(json);
			//return json;
			callback(json);
		},
		onerror : function(e) {
			universalError(e, url, this.status, this.responseText, callback);
		},
		timeout : TIMEOUT
	});
	xhr.open("POST", url);
	if (basicAuth.isAuthorized()) {
		authstr = 'Token ' + token;
		Ti.API.debug(authstr);
		xhr.setRequestHeader('Authorization', authstr);
	}
	xhr.send(body);
}

