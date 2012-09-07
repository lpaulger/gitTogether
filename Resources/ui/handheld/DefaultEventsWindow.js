function EventsWindow(event) {
	
	var self = Ti.UI.createWindow({
		title : event.title,
		backgroundColor : 'white'
	});


	return self;
};

module.exports = EventsWindow;
