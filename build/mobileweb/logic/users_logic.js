/**
 * @author Lucas Paulger
 */
var ws = require('data/webService');

exports.getUser = function(username, callback) {
	if (username == null) {
		ws.getRequest("user", function(user) {
			callback(user);
		});
	} else {
		ws.getRequest("users/" + username, function(user) {
			callback(user);
		});
	}

}

exports.getEvents = function(username, callback) {

	var event = require('lib/github/users/events');

	var events = ws.getRequest("users/" + username + "/events", function(events) {
		Ti.API.debug("getEvents...");
		var eventsFormatted = event.applyTemplate(events);
		callback(eventsFormatted);
	});
	return eventsFormatted;
}

exports.getEvent = function(username, eventId, callback) {

}