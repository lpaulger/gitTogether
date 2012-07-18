var SCOPES = ["repo", "user", "gist"];
var NOTE = "gitTogether Application";
var NOTEURL = "http://lucaspaulger.com";

var BasicAuth = function() {
	var accessToken = null;
	var self = this;
	this.loadAccessToken = function(pService) {

		Ti.API.debug('Loading access token for service [' + pService + '].');
		var token = Ti.App.Properties.getString('github_token');

		if (token) {
			accessToken = token;
		}

		Ti.API.debug('Loading access token: done [accessToken:' + accessToken + ']');
	};

	this.getActiveToken = function(pUrl, username, password, callback) {
		
		var json;
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				Ti.API.debug(this.responseText);
				Ti.API.debug("onload Success");
				json = JSON.parse(this.responseText);
				Ti.API.info(json);
				//save access token and return json;
				
				for (var i = 0; i < json.length; i++){
					//check if application exists, if so save token
					Ti.API.debug("app note: " + json[i].note);
					applicationAccessToken = decodeURI(json[i].token);
					if(json[i].note == "gitTogether Application"){
						//alert("you've already used this app!");
						self.accessToken = decodeURI(json[i].token);
						Ti.API.debug("token on get: " + self.accessToken);
						Ti.App.Properties.setString('github_token', self.accessToken);
						callback(true);
						return;
					}
				}
				//if no matches found return null
				callback(false);
				
			},
			onerror : function(e) {
				Ti.API.debug("error on get Active Access Token");
				Ti.API.info(e.error + " " + this.status + " " + this.responseText);
				callback(e);
			}
		});

		xhr.validatesSecureCertificate = true;
		xhr.open("GET", pUrl);
		xhr.setTimeout(10000);
		authstr = 'Basic ' + Titanium.Utils.base64encode(username + ':' + password);
		xhr.setRequestHeader('Authorization', authstr);
		xhr.send();
	}

	this.setAccessToken = function(accessToken) {
		Ti.API.debug('Saving access token for service [github_token].');
		Ti.App.Properties.setString('github_token', accessToken);
		this.accessToken = accessToken;
		Ti.API.debug('Saving access token: done [accessToken:' + this.accessToken + ']');
	};

	this.createAccessToken = function(pUrl, username, password, callback) {

		var json;
		alert("creating access token!");
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				Ti.API.debug(this.responseText);

				json = JSON.parse(this.responseText);
				Ti.API.info(json);
				//save access token and return json;
				self.accessToken = decodeURI(json.token);
				Ti.App.Properties.setString('github_token', json.token);
				Ti.API.info('The value of the github_token property is: ' + Ti.App.Properties.getString('github_token'));
				callback(true);
			},
			onerror : function(e) {
				alert("oh no! we couldn't sign you in!");
				Ti.API.info(e.error + " " + this.status + " " + this.responseText);
				callback(false);
			}
		});

		xhr.validatesSecureCertificate = true;
		xhr.open("POST", pUrl);
		xhr.setTimeout(10000);
		authstr = 'Basic ' + Titanium.Utils.base64encode(username + ':' + password);
		xhr.setRequestHeader('Authorization', authstr);
		var body = JSON.stringify({
			username : username,
			password : password,
			scopes : SCOPES,
			note : NOTE,
			noteurl : NOTEURL
		});
		Ti.API.info(body);
		xhr.send(body);
	};

	// will tell if the consumer is authorized
	//TODO: make request to see if token is valid. if not prompt user to reset auth token
	this.isAuthorized = function() {
		var token = Ti.App.Properties.getString('github_token');
		Ti.API.debug("token: " + token);
		return (token !== null);
	};
}
