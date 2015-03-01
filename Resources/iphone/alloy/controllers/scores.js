function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId25(e) {
        if (e && e.fromAdapter) return;
        __alloyId25.opts || {};
        var models = __alloyId24.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId15 = models[i];
            __alloyId15.__transform = {};
            var __alloyId16 = Ti.UI.createTableViewRow({
                hasCheck: false,
                width: Ti.UI.FILL,
                height: "40dp",
                backgroundColor: "#166181",
                rowId: "undefined" != typeof __alloyId15.__transform["id"] ? __alloyId15.__transform["id"] : __alloyId15.get("id")
            });
            rows.push(__alloyId16);
            var __alloyId17 = Ti.UI.createView({
                width: "60%",
                height: Ti.UI.FILL,
                left: "10%",
                layout: "horizontal"
            });
            __alloyId16.add(__alloyId17);
            var __alloyId18 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                top: "33%",
                textAlign: "right",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "undefined" != typeof __alloyId15.__transform["hour"] ? __alloyId15.__transform["hour"] : __alloyId15.get("hour")
            });
            __alloyId17.add(__alloyId18);
            var __alloyId19 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "h"
            });
            __alloyId17.add(__alloyId19);
            var __alloyId20 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                top: "33%",
                textAlign: "right",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "undefined" != typeof __alloyId15.__transform["minute"] ? __alloyId15.__transform["minute"] : __alloyId15.get("minute")
            });
            __alloyId17.add(__alloyId20);
            var __alloyId21 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "m"
            });
            __alloyId17.add(__alloyId21);
            var __alloyId22 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                top: "33%",
                textAlign: "right",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "undefined" != typeof __alloyId15.__transform["second"] ? __alloyId15.__transform["second"] : __alloyId15.get("second")
            });
            __alloyId17.add(__alloyId22);
            var __alloyId23 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "s"
            });
            __alloyId17.add(__alloyId23);
        }
        $.__views.scoreTableView.setData(rows);
    }
    function closeWindow() {
        $.navGroup.close();
    }
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
    var __defers = {};
    Alloy.Collections.instance("score");
    $.__views.scoreWindow = Ti.UI.createWindow({
        backgroundColor: "#166181",
        id: "scoreWindow"
    });
    $.__views.viewScores = Ti.UI.createView({
        id: "viewScores",
        layout: "vertical"
    });
    $.__views.scoreWindow.add($.__views.viewScores);
    $.__views.labelBestScore = Ti.UI.createLabel({
        top: "15%",
        color: "white",
        font: {
            fontSize: 30
        },
        text: "Historique Score",
        id: "labelBestScore"
    });
    $.__views.viewScores.add($.__views.labelBestScore);
    $.__views.scoreTableView = Ti.UI.createTableView({
        widht: Ti.UI.FILL,
        height: "60%",
        top: "5%",
        backgroundColor: "#166181",
        id: "scoreTableView"
    });
    $.__views.viewScores.add($.__views.scoreTableView);
    var __alloyId24 = Alloy.Collections["score"] || score;
    __alloyId24.on("fetch destroy change add remove reset", __alloyId25);
    $.__views.closeWindowButton = Ti.UI.createButton({
        width: "80%",
        height: Titanium.UI.SIZE,
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        top: "5%",
        color: "#166181",
        title: "Retour",
        id: "closeWindowButton"
    });
    $.__views.viewScores.add($.__views.closeWindowButton);
    closeWindow ? $.__views.closeWindowButton.addEventListener("click", closeWindow) : __defers["$.__views.closeWindowButton!click!closeWindow"] = true;
    $.__views.navGroup = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.scoreWindow,
        id: "navGroup"
    });
    $.__views.navGroup && $.addTopLevelView($.__views.navGroup);
    exports.destroy = function() {
        __alloyId24.off("fetch destroy change add remove reset", __alloyId25);
    };
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
    __defers["$.__views.closeWindowButton!click!closeWindow"] && $.__views.closeWindowButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;