function EventsWindow(title) {
	var usersLogic = require('logic/users_logic');

	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : 'white'
	});

	var search = Titanium.UI.createSearchBar({
		hintText : L('events_search_box'),
		height : 43,
		top : 0
	});
	search.setShowCancel(true, {
		animated : true
	});

	self.add(search);

	var table = Titanium.UI.createTableView({
		top : 44
	});

	search.addEventListener('return', function(e) {

		usersLogic.getEvents(e.value, function(events) {
			var data = [];
			var row = null;
			for (var i = 0; i < events.length; i++) {
				Ti.API.info("Events: ");
				Ti.API.info(events[i]);

				var enabledWrapperView = Ti.UI.createView({
					backgroundColor : '#008FD5',
					objName : 'enabledWrapperView',
					rowID : i,
					width : Ti.UI.FILL,
					height : '100%'
				});

				var disabledWrapperView = Ti.UI.createView({
					backgroundColor : '#A2E0FF',
					objName : 'disabledWarpperView',
					touchEnabled : false,
					width : 300,
					height : '80%'
				});
				enabledWrapperView.add(disabledWrapperView);

				var label = Ti.UI.createLabel({
					backgroundColor : '#313F48',
					color : 'white',
					objName : 'label',
					text : events[i].title,
					touchEnabled : false,
					left : 0,
					width : 200
				});

				disabledWrapperView.add(label);
				
				row = Ti.UI.createTableViewRow({
					className : 'row',
					objName : 'row',
					touchEnabled : true,
					height : 100
				});
				
				// row = Ti.UI.createTableViewRow({
					// id : events[i].id,
					// title : events[i].title,
					// hasChild : true,
					// color : '#000',
					// font : {
						// fontSize : 10
					// }
				// });
				
				row.add(enabledWrapperView);
				data.push(row);
			}

			table.setData(data);
			self.add(table);
			search.blur();
		});
	});

	search.addEventListener('cancel', function(e) {
		search.blur();
	});

	return self;
};

module.exports = EventsWindow;
