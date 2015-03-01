exports.definition = {
	config: {
		columns: {
		    "hour": "INTEGER",
		    "minute": "INTEGER",
		    "second": "INTEGER",
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT"
		},
		adapter: {
			type: "sql",
			collection_name: "score"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};