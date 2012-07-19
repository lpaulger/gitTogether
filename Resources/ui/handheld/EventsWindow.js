function EventsWindow(eventData) {
	
	var self = Ti.UI.createWindow({
		title : eventData.type,
		backgroundColor : 'white'
	});


	return self;
};

module.exports = EventsWindow;
