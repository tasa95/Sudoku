function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goToBestScore() {
        var bestScores = Alloy.createController("bestScore").getView();
        $.navGroup.openWindow(bestScores);
    }
    function goToScores() {
        var scores = Alloy.createController("scores").getView();
        $.navGroup.openWindow(scores);
    }
    function backHome() {
        $.navGroup.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "statistic";
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
    $.__views.windowStats = Ti.UI.createWindow({
        id: "windowStats",
        backgroundColor: "#166181"
    });
    $.__views.__alloyId24 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId24"
    });
    $.__views.windowStats.add($.__views.__alloyId24);
    $.__views.labelStat = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 30
        },
        top: "15%",
        text: "Mes statistiques",
        id: "labelStat"
    });
    $.__views.__alloyId24.add($.__views.labelStat);
    $.__views.buttonScore = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        height: Titanium.UI.SIZE,
        width: "80%",
        left: "10%",
        color: "#166181",
        top: 20,
        title: "Mon meilleur score",
        id: "buttonScore"
    });
    $.__views.__alloyId24.add($.__views.buttonScore);
    goToBestScore ? $.__views.buttonScore.addEventListener("click", goToBestScore) : __defers["$.__views.buttonScore!click!goToBestScore"] = true;
    $.__views.buttonScore = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        height: Titanium.UI.SIZE,
        width: "80%",
        left: "10%",
        color: "#166181",
        top: 20,
        title: "Mes scores",
        id: "buttonScore"
    });
    $.__views.__alloyId24.add($.__views.buttonScore);
    goToScores ? $.__views.buttonScore.addEventListener("click", goToScores) : __defers["$.__views.buttonScore!click!goToScores"] = true;
    $.__views.buttonScore = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        height: Titanium.UI.SIZE,
        width: "80%",
        left: "10%",
        color: "#166181",
        top: 20,
        title: "Retour",
        id: "buttonScore"
    });
    $.__views.__alloyId24.add($.__views.buttonScore);
    backHome ? $.__views.buttonScore.addEventListener("click", backHome) : __defers["$.__views.buttonScore!click!backHome"] = true;
    $.__views.navGroup = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.windowStats,
        id: "navGroup"
    });
    $.__views.navGroup && $.addTopLevelView($.__views.navGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.windowStats.hideNavBar();
    __defers["$.__views.buttonScore!click!goToBestScore"] && $.__views.buttonScore.addEventListener("click", goToBestScore);
    __defers["$.__views.buttonScore!click!goToScores"] && $.__views.buttonScore.addEventListener("click", goToScores);
    __defers["$.__views.buttonScore!click!backHome"] && $.__views.buttonScore.addEventListener("click", backHome);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;