/*
 * This Class will process an event object from github and return a gitTogether useable object within the app
 */

exports.gitTogetherEventObject = function(GEO){
	var self = this;
	
	this.eventType = GEO.type;
	this.owner = GEO.actor.login;
	this.created_at = GEO.created_at;
	this.payload = GEO.payload;
	this.GEO = GEO;
	
	this.title = this.eventType + " by: " + this.owner;
	this.message = "this type needs a description!";
	
	//TODO: implement all event types
	this.processEvent = function(){
		switch(self.eventType){
			case "PushEvent":
				self.message = self.payload.commits[0].message;
				break;
			case "IssuesEvent":
				self.message = self.payload.issue.body;
				break;
			case "CreateEvent":
				self.message = self.payload.description;
				break;
			default:
				break;
		}
	}
	this.processEvent();
}

