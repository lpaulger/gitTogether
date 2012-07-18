function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	var EventsWindow = require('ui/handheld/EventsWindow');
	//create app tabs
	var win1 = new Window(L('home')), win2 = new EventsWindow(L('events'));

	var tab1 = Ti.UI.createTab({
		title : L('home'),
		icon : '/images/KS_nav_ui.png',
		window : win1
	});
	win1.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title : L('events'),
		icon : '/images/KS_nav_views.png',
		window : win2
	});
	win2.containingTab = tab2;

	self.addTab(tab1);
	self.addTab(tab2);

	return self;
};

module.exports = ApplicationTabGroup;
