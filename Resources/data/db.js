var DATABASE_NAME = 'stores';

exports.createDb = function() {
	Ti.Database.install('karma.sqlite', DATABASE_NAME);
};

//Stores Local Database Calls

exports.selectStores = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from stores');
	while (rows.isValidRow()) {
		retData.push({id:rows.fieldByName('id'), title:rows.fieldByName('title'), address:rows.fieldByName('address'), zip:rows.fieldByName('zip'), state:rows.fieldByName('state'), city:rows.fieldByName('city')});
		rows.next();
	}
	db.close();
	return retData;
};
