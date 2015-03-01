function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeWindow() {
        $.scoreWindow.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bestScore";
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
    $.__views.scoreWindow = Ti.UI.createWindow({
        id: "scoreWindow",
        backgroundColor: "#166181"
    });
    $.__views.scoreWindow && $.addTopLevelView($.__views.scoreWindow);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.scoreWindow.add($.__views.__alloyId3);
    $.__views.labelBestScore = Ti.UI.createLabel({
        top: "15%",
        color: "white",
        font: {
            fontSize: 30
        },
        text: "Mon meilleur score",
        id: "labelBestScore"
    });
    $.__views.__alloyId3.add($.__views.labelBestScore);
    $.__views.valueBestScore = Ti.UI.createLabel({
        top: "15%",
        color: "white",
        font: {
            fontSize: 24
        },
        id: "valueBestScore"
    });
    $.__views.__alloyId3.add($.__views.valueBestScore);
    $.__views.Sudoku = Ti.UI.createView({
        id: "Sudoku"
    });
    $.__views.scoreWindow.add($.__views.Sudoku);
    $.__views.buttonBack = Ti.UI.createButton({
        width: "90%",
        height: "10%",
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: 15,
        textAlign: "Center",
        bottom: "5%",
        font: {
            fontSize: 18
        },
        title: "Retour",
        id: "buttonBack"
    });
    $.__views.scoreWindow.add($.__views.buttonBack);
    closeWindow ? $.__views.buttonBack.addEventListener("click", closeWindow) : __defers["$.__views.buttonBack!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var scoreCollection = Alloy.Collections.instance("score");
    scoreCollection.fetch({
        success: function() {
            var bestScore = Alloy.Collections.instance("score");
            _.each(scoreCollection.models, function(element, index) {
                0 == index ? bestScore = element : bestScore.get("hour") >= element.get("hour") && (bestScore.get("hour") > element.get("hour") ? bestScore = element : bestScore.get("minute") >= element.get("minute") && (bestScore.get("minute") > element.get("minute") ? bestScore = element : bestScore.get("second") >= element.get("second") && (bestScore = element)));
                $.valueBestScore.text = bestScore.get("hour") + "h" + bestScore.get("minute") + "m" + bestScore.get("second") + "s";
            });
        }
    });
    $.scoreWindow.hideNavBar();
    __defers["$.__views.buttonBack!click!closeWindow"] && $.__views.buttonBack.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;