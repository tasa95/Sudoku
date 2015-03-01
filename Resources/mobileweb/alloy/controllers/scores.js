function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function deleteScore(rowScore) {
        var scoreData = Alloy.createCollection("score");
        scoreData.fetch({
            query: "SELECT * FROM score WHERE id = " + rowScore.rowId
        });
        if (scoreData.length > 0) {
            scoreData.at(0).destroy();
            Alloy.Collections.score.fetch();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "scores";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("score");
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.scoreTableView.addEventListener("click", function(e) {
        var recoverDatabase = Alloy.createCollection("score");
        recoverDatabase.fetch({
            query: "SELECT * FROM score WHERE id = " + e.row.rowId
        });
        var args = {
            hour: recoverDatabase.at(0).get("hour"),
            minute: recoverDatabase.at(0).get("minute"),
            second: recoverDatabase.at(0).get("second")
        };
        var detail = Alloy.createController("detailScore", args).getView();
        $.navGroup.openWindow(detail);
    });
    $.scoreTableView.addEventListener("longpress", function(e) {
        var row = e.row;
        var alertDialog = Titanium.UI.createAlertDialog({
            title: "Supprimer",
            message: "Voulez vous supprimer ce score?",
            buttonNames: [ "Oui", "Non" ],
            cancel: 1
        });
        alertDialog.show();
        alertDialog.addEventListener("click", function(e) {
            0 == e.index ? deleteScore(row) : 1 == e.index;
        });
    });
    $.navGroup.addEventListener("close", function() {
        $.destroy();
    });
    Alloy.Collections.score.fetch();
    $.scoreWindow.hideNavBar();
    $.navGroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;