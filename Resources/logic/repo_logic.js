/**
 * @author: Lucas Paulger
 */

/**
 * Gets the Repos for the current user
 * @param {Object} callback
 */
exports.getRepos = function(callback) {
	var url = "user/repos";
	var ws = require("data/webService");
	ws.getRequest(url, function(data) {
		//Ti.API.debug(data);
		
		for(var i = 0; i < data.length; i++) {
			//Ti.API.debug("REPO: " + data[i].name);
		}
		callback(data);
	});
}

exports.getRepo = function(repoName, callback) {
	var username = Ti.App.Properties.getString('username');
	var url = "repos/" + username + "/" + repoName;
	var ws = require("data/webService");
	ws.getRequest(url, function(data) {
		//Ti.API.debug(data);
		
		for(var i = 0; i < data.length; i++) {
			//Ti.API.debug("REPO: " + data[i].name);
		}
		callback(data);
	});
}

exports.getRepoEvents = function(username, repoName, callback){
	var url = "repos/" + username + "/" + repoName + "/events";
	var ws = require("data/webService");
	ws.getRequest(url, function(data) {
		//Ti.API.debug(data);
		Ti.API.debug("results length: " + data.length);
		for(var i = 0; i < data.length; i++) {
			//Ti.API.debug("REPO: " + data[i].name);
		}
		callback(data);
	});
};

exports.saveCurrentRepo = function(repoId, callback){
	
}
