function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId22(e) {
        if (e && e.fromAdapter) return;
        __alloyId22.opts || {};
        var models = __alloyId21.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId12 = models[i];
            __alloyId12.__transform = {};
            var __alloyId13 = Ti.UI.createTableViewRow({
                hasCheck: false,
                width: Ti.UI.FILL,
                height: "40dp",
                backgroundColor: "#166181",
                rowId: "undefined" != typeof __alloyId12.__transform["id"] ? __alloyId12.__transform["id"] : __alloyId12.get("id")
            });
            rows.push(__alloyId13);
            var __alloyId14 = Ti.UI.createView({
                width: "40%",
                height: Ti.UI.FILL,
                left: "10%",
                layout: "horizontal"
            });
            __alloyId13.add(__alloyId14);
            var __alloyId15 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                textAlign: "right",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "undefined" != typeof __alloyId12.__transform["hour"] ? __alloyId12.__transform["hour"] : __alloyId12.get("hour")
            });
            __alloyId14.add(__alloyId15);
            var __alloyId16 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "h"
            });
            __alloyId14.add(__alloyId16);
            var __alloyId17 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                textAlign: "right",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "undefined" != typeof __alloyId12.__transform["minute"] ? __alloyId12.__transform["minute"] : __alloyId12.get("minute")
            });
            __alloyId14.add(__alloyId17);
            var __alloyId18 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "m"
            });
            __alloyId14.add(__alloyId18);
            var __alloyId19 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                textAlign: "right",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "undefined" != typeof __alloyId12.__transform["second"] ? __alloyId12.__transform["second"] : __alloyId12.get("second")
            });
            __alloyId14.add(__alloyId19);
            var __alloyId20 = Ti.UI.createLabel({
                width: "15%",
                top: "33%",
                color: "white",
                font: {
                    fontSize: 20
                },
                text: "s"
            });
            __alloyId14.add(__alloyId20);
        }
        $.__views.scoreTableView.setData(rows);
    }
    function closeWindow() {
        $.navGroup.close();
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
    var __alloyId21 = Alloy.Collections["score"] || score;
    __alloyId21.on("fetch destroy change add remove reset", __alloyId22);
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
        __alloyId21.off("fetch destroy change add remove reset", __alloyId22);
    };
    _.extend($, $.__views);
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