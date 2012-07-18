function LoginWindow(title) {
	var isiOS = Ti.App.iOS;
	var authLogic = require('logic/authentication_logic');
	var username = Ti.App.Properties.getString('username');
	if (username !== null || username == '') {
		usernameFieldText = username;
	} else {
		usernameFieldText = null;
	}
	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : '#13386c',
		barColor : 'orange'
	});

	var usernameField = Ti.UI.createTextField({
		hintText : L('username'),
		value : usernameFieldText,
		height : 40,
		width : 250,
		top : 100,
		autocorrect : false,
		autocapitalization : 0,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	self.add(usernameField);

	var passwordField = Ti.UI.createTextField({
		hintText : L('password'),
		height : 40,
		width : 250,
		top : 160,
		autocorrect : false,
		autocapitalization : 0,
		passwordMask : true,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	self.add(passwordField);

	var login = Ti.UI.createButton({
		height : 44,
		width : 200,
		title : L('login'),
		bottom : 100
	});
	self.add(login);

	var navActInd = Titanium.UI.createActivityIndicator();

	login.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		Ti.API.info('fire activity indicator');
		self.setRightNavButton(navActInd);
		navActInd.show();

		//validation (note empty)
		if (usernameField.value == '' || passwordField.value == '') {
			alert(L('username_or_password_empty'));
			navActInd.hide();
		} else {
			var success = false;
			//return as callback for authenticate user
			authLogic.authorize(usernameField.value, passwordField.value, function(response) {
				//alert('login window callback ' + response);
				navActInd.hide();
				if (response == false) {
					Ti.API.info('authentication failure');
				} else {
					success = true;

					var Window = require('ui/handheld/ApplicationWindow');

					new Window().open();
				}

			});
		}

	});
	return self;
};

module.exports = LoginWindow;
