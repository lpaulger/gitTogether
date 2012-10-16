/*
 * PICKER
 */
function picker_view(){
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
	
	this.slide_in = Titanium.UI.createAnimation({
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
	
	cancel.addEventListener('click', function() {
		picker_view.animate(slide_out);
	});

	done.addEventListener('click', function() {
		var repoName = picker.getSelectedRow(0).title;

		//clear current, then load new.
		cleanEvents(function() {
			repo.getRepo(repoName, function(repoData) {
				Ti.API.debug(repoData);
				repoOwner = repoData.owner.login;
				var repoEventsData = [];

				repo.getRepoEvents(repoOwner, repoName, function(repoEvents) {

					tableSize = repoEvents.length;

					for (var i = 0; i < repoEvents.length; i++) {

						var Event = new events.gitTogetherEventObject(repoEvents[i]);

						var eventViewRow = Ti.UI.createTableViewRow({
							selectedBackgroundColor : '#fff',
							height : 100,
							className : 'datarow',
							clickname : 'row',
							data : Event
						});

						var eventNameLabel = Ti.UI.createLabel({
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
							text : Event.title
						});

						eventViewRow.add(eventNameLabel);

						//TODO add logic for each type of eventType

						var eventDescriptionLabel = Ti.UI.createLabel({
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
							text : Event.message //payload.commits[0].message
						});
						eventViewRow.add(eventDescriptionLabel);

						var eventUpdateLabel = Ti.UI.createLabel({
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
							text : Event.created_at
						});
						eventViewRow.add(eventUpdateLabel);
						repoSettingsTableView.appendRow(eventViewRow, {
							animationStyle : Titanium.UI.iPhone.RowAnimationStyle.LEFT
						});
					}
				});

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

				repoSettingsTableView.updateRow(0, repoInfoViewRow, {
					animationStyle : Titanium.UI.iPhone.RowAnimationStyle.LEFT
				});
			});
			picker_view.animate(slide_out);
		});
	});
	
	return picker_view;
}

module.exports = picker_view;