exports.applyTemplate = function(events) {
	var eventsFormatted = [];
	Ti.API.debug("events.applyTempate...");

	for (var i = 0; i < events.length; i++) {

		var event = new Object();
		event.id = events[i].id;
		event.title = events[i].type;
		event.time = events[i].created_at;

		switch(event.title) {
			case "FollowEvent":
				event.title = "Following " + events[i].payload.target.name;
				break;
			case "PushEvent":
				event.title = "Pushed to " + events[i].repo.name;
				break;
			case "WatchEvent":
				event.title = "Watching " + events[i].repo.name;
				
				break;
			default:

		}

		eventsFormatted.push(event);
	}

	return eventsFormatted;
}
