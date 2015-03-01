var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            hour: "INTEGER",
            minute: "INTEGER",
            second: "INTEGER",
            id: "INTEGER PRIMARY KEY AUTOINCREMENT"
        },
        adapter: {
            type: "sql",
            collection_name: "score"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("score", exports.definition, []);

collection = Alloy.C("score", exports.definition, model);

exports.Model = model;

exports.Collection = collection;