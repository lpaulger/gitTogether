function ApplicationWindow(title) {

	var repo = require("logic/repo_logic");
	var user = require("logic/users_logic");

	var self = Ti.UI.createWindow({
		title : L('Home_Page_Title'),
		barColor : 'gray',
		backgroundColor : 'white',
		modal:true
	});
	
	var UserInfoContainerView = Ti.UI.createView({
		height: 140
	});
	
	var UserInfoView = Ti.UI.createView({
		borderRadius : 10,
		top : 20,
		left: 10,
		right:10,
		backgroundColor : 'gray',
		width : 300,
		height : 115,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : false
	});
	
	var userInfo = user.getUser(null, function(userInfo) {
		//Ti.API.debug(userInfo);
		//Ti.API.debug(userInfo.name);

		var userImage = Ti.UI.createImageView({
			image : userInfo.avatar_url,
			left : 20
		});

		var usernameLabel = Ti.UI.createLabel({
			text : userInfo.name,
			font : {
				fontSize : 26
			},
			textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
			top : 40,
			right : 20,
			height : 'auto',
			width : 'auto'
		});
		UserInfoView.add(userImage);
		UserInfoView.add(usernameLabel);
		
		UserInfoContainerView.add(UserInfoView);
	});

	//UserInfoView.add(currentProjectLabel);

	var repoSection = Ti.UI.createTableViewSection({
		headerTitle : 'Select a Default Repo'
	});

	repoSection.add(Ti.UI.createTableViewRow({
		title : "click to change",
		color : "gray"
	}));

	var repoSettings = Ti.UI.createTableView({
		top : 0,
		headerView : UserInfoContainerView,
		data : [repoSection],
		visible : true,
		style : Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(repoSettings);

	/*
	 * PICKER
	 */
	var picker_view = Titanium.UI.createView({
		height : 251,
		bottom : -251
	});

	var cancel = Titanium.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var done = Titanium.UI.createButton({
		title : 'Done',
		style : Titanium.UI.iPhone.SystemButtonStyle.DONE
	});

	var spacer = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.createToolbar({
		top : 0,
		items : [cancel, spacer, done]
	});
	var slide_in = Titanium.UI.createAnimation({
		bottom : 0
	});
	var slide_out = Titanium.UI.createAnimation({
		bottom : -251
	});
	var picker = Ti.UI.createPicker({
		top : 43
	});

	picker.selectionIndicator = true;

	picker_view.add(toolbar);
	picker_view.add(picker);

	UserInfoView.addEventListener('click', function() {
		alert('load user info page');
	});

	repoSettings.addEventListener('click', function() {
		picker_view.animate(slide_in);
	});

	cancel.addEventListener('click', function() {
		picker_view.animate(slide_out);
	});

	done.addEventListener('click', function() {
		var repoName = picker.getSelectedRow(0).title;
		repo.getRepo(repoName, function(repoData) {
			Ti.API.debug(repoData);
			
			Ti.API.debug(repoData.description);
			
			Ti.API.debug(repoName);
			
			var repoInfoViewRow = Ti.UI.createTableViewRow({
				selectedBackgroundColor : '#fff',
				height : 100,
				className : 'datarow',
				clickname : 'row'
			});
			
			
			var repoNameLabel = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontSize : 16,
					fontWeight : 'bold',
					fontFamily : 'Arial'
				},
				left : 15,
				top : 2,
				height : 30,
				width : 200,
				clickName : 'repoName',
				text : repoName
			});
			
			repoInfoViewRow.add(repoNameLabel);
			
			var repoDescriptionLabel = Ti.UI.createLabel({
				color : '#222',
				font : {
					fontSize : 12,
					fontWeight : 'normal',
					fontFamily : 'Arial'
				},
				left : 15,
				top : 21,
				height : 50,
				width : 200,
				clickName : 'description',
				text : repoData.description
			});
			repoInfoViewRow.add(repoDescriptionLabel);

			var repoUpdateLabel = Ti.UI.createLabel({
				bottom : 2,
				left : 15,
				width : 200,
				clickName : 'last_updated',
				height : 32,
				font : {
					fontSize : 12,
					fontWeight : 'normal',
					fontFamily : 'Arial'
				},
				text : repoData.updated_at
			});
			repoInfoViewRow.add(repoUpdateLabel);
			
			var button = Ti.UI.createView({
				backgroundImage : '../../images/KS_nav_ui.png',
				top : 35,
				right : 5,
				width : 36,
				clickName : 'button',
				height : 34
			});
			repoInfoViewRow.add(button);
			
			repoSettings.updateRow(0, repoInfoViewRow, {
				animationStyle : Titanium.UI.iPhone.RowAnimationStyle.LEFT
			});

			//events data
			var data = {
				title : 'New Row ' + newRowCount,
				header : 'Events: '
			};

			tableview.appendRow(data);

			var eventsSection = Ti.UI.createTableViewSection({
				headerTitle : 'Events'
			});

			eventsSection.add(Ti.UI.createTableViewRow({
				title : "click to change",
				color : "gray"
			}));

			//repoSettings.add(eventsSection);

			repoSettings.separatorStyle = Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE;
			repoSettings.separatorColor = null;
			repoSettings.setHeaderTitle("Current Project: ");
		});
		picker_view.animate(slide_out);

	});

	repo.getRepos(function(data) {
		var repoList = [];
		//Ti.API.debug(data);
		for (var i = 0; i < data.length; i++) {
			repoList[i] = Ti.UI.createPickerRow({
				title : data[i].name
			});
		}
		picker.add(repoList);
		self.add(picker_view);
	});

	return self;
};

module.exports = ApplicationWindow;
